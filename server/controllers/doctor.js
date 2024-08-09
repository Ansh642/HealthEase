const mongoose = require('mongoose');
const Doctor = require("../models/Doctors");
const Category = require("../models/Category");
const Booking = require("../models/Booking");
const {uploadImageToCloudinary} = require('../utils/imageUpload');
const User = require('../models/User');

require("dotenv").config();
const bcrypt  =require("bcrypt");

exports.createDoctor = async(req,res)=>{
    try{

     const {name,password,email,experience,about,location,category}= req.body;
     const image = req.files.photo;

     //console.log(about);
     
     const categoryDetails  = await Category.findOne({name:category});
     

     if(!image || !password || !email || !experience || !about || !location){
        return res.status(400).json({
            success: false,
            message: "Please enter complete details",
        });
     }

     const thumbnailImage = await uploadImageToCloudinary(image,process.env.FOLDER_NAME);
     const newpassword = await bcrypt.hash(password,10);

     const newDoctor = await Doctor.create({
        name,
        password:newpassword,
        years:experience,
        about,
        address:location,
        email,
        image: thumbnailImage.secure_url,
        category : categoryDetails._id,
        phone: 8171579897,
     });

     console.log(newDoctor);

      //insert doctor in that particular category
     const newDetails = await Category.findByIdAndUpdate(categoryDetails._id,{
        $push:{
            doctors:newDoctor._id,
        }
     },{new:true});

     return res.status(200).json({
        success: true,
        newDoctor,
     })
    }

    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


exports.getDoctors  =async(req,res)=>{
    try{
        const allDoctors  = await Doctor.find({},'-id ').populate("category");
        return res.status(200).json({
            success: true,
            allDoctors,
        });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


exports.getDoctorsByName = async(req, res)=>{
    try{
      const name = req.params.name;
      const newName = name.slice(1,);

      const allDoctors = await Category.find({name: newName}).populate("doctors");

      return res.status(200).json({
        success: true,
        allDoctors
      });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


exports.doctorDetails = async (req, res) => {
    try {
        
        let id = req.params.id.trim(); // Remove leading and trailing whitespace
        id = id.replace(/^:/, ''); // Remove leading colon if present

        const doctorDetails = await Doctor.findById(id).populate("category");

        const otherDoctors = await Doctor.find({
            _id:{
                $ne : id,
            }
        }).populate("category");


        return res.status(200).json({
            success: true,
            doctorDetails,
            otherDoctors,
        });

    } 
    
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


exports.searchDoctor = async (req, res) => {
    try {
      let { search } = req.body;
  
      if (!search) {
        return res.status(400).json({
          success: false,
          message: "Search term is required",
        });
      }
  
      // Preprocess the search term: remove dots and common prefixes
      search = search.replace(/\./g, '').replace(/^(Dr|Mr|Mrs|Ms)\s+/i, '');
  
      // Construct the regex pattern for case-insensitive match
      const regex = new RegExp(search, 'i');
  
      // Perform the MongoDB query using the regex pattern
      const similarDoctors = await Doctor.find({
        name: { $regex: regex }
      }).populate("category");
  
      return res.status(200).json({
        success: true,
        message: "Related doctors fetched successfully",
        similarDoctors,
      });
    } catch (err) {
      console.error("Error fetching doctors:", err);
      return res.status(500).json({
        success: false,
        message: "Error fetching doctors",
        error: err.message,
      });
    }
};


exports.getAppointments  =async(req, res)=>{
    try{
      const userId = req.user.id;

      const doctor  = await Doctor.findById(userId).populate({
        path : "appointments",
        populate:{
            path : "user",
        }
      });

      //console.log(doctor.appointments);

      return res.status(200).json({
        success: true,
        message: "Appointments fetched successfully",
        appointments:doctor.appointments,
      });

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
  

exports.completeAppointments = async(req, res) => {
  try {
    const { id } = req.body; // booking id
    const userId = req.user.id; // doctor id

    // Remove booking from doctor's appointments
    const removeBooking = await Doctor.findByIdAndUpdate(userId, {
      $pull: {
        appointments: id,
      }
    });

    // Find the booking to get the user ID associated with it
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Remove the booking from the user's bookings array
    const removeBookingFromUser = await User.findByIdAndUpdate(booking.user, {
      $pull: {
        bookings: id,
      }
    });
    
    // Delete the booking
    const deleteBooking = await Booking.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Booking successfully deleted",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}


exports.sendMessages = async (req, res) => {

  const { userId, message } = req.body;
  const doctorId = req.user.id;

  try {
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    const newMessage = {
      user: doctorId,
      message: message,
    };
    user.messages.push(newMessage);
    
    
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Message sent successfully'
     });
  } 
  catch (error) 
  {
    res.status(500).json({
      success: false,
      message: 'Server error' });
  }

};

  
exports.getNotifications = async (req, res) => {
  try {
      const userId = req.user.id; // Assuming the authenticated user is a doctor
      const user = await Doctor.findById(userId).populate('messages.user', 'name'); // Populate user details

      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({ 
          success: true, 
          messages: user.messages.map(msg => ({
              _id: msg._id,
              message: msg.message,
              user: msg.user?.name,
              userId: msg.user,
              timestamp: msg.createdAt
          })) 
      });
  } catch (error) {
      console.error('Error fetching messages:', error.message);
      res.status(500).json({ success: false, message: 'Server error' });
  }
};