const mongoose = require('mongoose');
const Doctor = require("../models/Doctors");
const Category = require("../models/Category");
const {uploadImageToCloudinary} = require('../utils/imageUpload');
require("dotenv").config();
const bcrypt  =require("bcrypt");

exports.createDoctor = async(req,res)=>{
    try{

     const {name,password,email,years,about,address,phone,category}= req.body;
     const image = req.files.image;
     
     const categoryDetails  = await Category.findOne({name:category});

     if(!image || !password || !email || !years || !about || !address || !phone){
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
        years,
        about,
        address,
        phone,
        email,
        image: thumbnailImage.secure_url,
        category : categoryDetails._id,
     });

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

  
  


