const User = require("../models/User");
const Booking = require("../models/Booking");
const Doctor = require("../models/Doctors");
const bcrypt  =require("bcrypt");
const JWT= require("jsonwebtoken");
const {mailsend} = require("../utils/mailsend");
require("dotenv").config();



exports.signup = async(req,res)=>{
    try{
       const {name,email,password,confirmPassword} = req.body;

       if(!name || !email || !password || !confirmPassword)
       {
        return res.status(400).json({
           success: false,
           message: 'Please enter all required fields',
        });
       }

       if(password !== confirmPassword)
       {
        return res.status(400).json({
            success: false,
            message: 'Please enter correct password',
        });
       }

       const userDetails = await User.findOne({email});

       if(userDetails)
       {
        return res.status(400).json({
            success: false,
            message: 'User already exists',
        });
       }

       const hashedPassword = await bcrypt.hash(password,10);
       
     // create a new entry in db;
     const newUser= await User.create({
        name,
        email,
        password : hashedPassword,
        image : `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
    });

    return res.status(200).json({
        success : true,
        message : 'User added successfully',
        newUser,
    });
  }
    catch(err)
    {
        return res.status(500).json({
            success : false,
            message : err.message
        });
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter complete details",
            });
        }

        let userDetails = await User.findOne({ email });
        let userType = 'User';

        if (!userDetails) {
            userDetails = await Doctor.findOne({ email });
            userType = 'Doctor';
        }

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, userDetails.password);

        if (isPasswordValid) {
            const payload = {
                email: userDetails.email,
                id: userDetails._id,
                userType: userType
            };

            const token = JWT.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });

            return res.status(200).json({
                success: true,
                message: "Logged in successfully",
                userDetails,
                token
            });

        } else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


exports.resetPassword = async(req,res)=>{
    try{
      const {email,password,confirmPassword} = req.body;

      if(!email || !password || !confirmPassword)
      {
        return res.status(400).json({
            success : false,
            message : "Enter all required fields"
        })
      }

      if(password !== confirmPassword)
      {
        return res.status(400).json({
            success : false,
            message : "Passwords do not match"
        })
      }

      const userDetails = await User.findOne({email});

      if(!userDetails)
      {
        return res.status(400).json({
            success : false,
            message : "User does not exist",
        });
      }

      const newPassword = await bcrypt.hash(password,10);

      const updatedDetails = await User.findOneAndUpdate({email},{
        password : newPassword,
      },{new:true});

      return res.status(200).json({
        success : true,
        message : "Password updated successfully",
        updatedDetails
      })
    }


    catch(err)
    {
        return res.status(500).json({
            success : false,
            message : err.message
        });
    }
}

exports.bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date, time, id, email } = req.body;

    if (!date || !time) {
      return res.status(400).json({
        success: false,
        message: "Please enter date and time",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User must be logged in',
      });
    }

    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (appointmentDate < today) {
      return res.status(400).json({
        success: false,
        message: "Appointment date cannot be before today's date",
      });
    }

    // Create the new booking
    const newBooking = new Booking({
      date,
      time,
      doctor: id,
      user: userId,
    });

    // Update user and doctor records and send email concurrently
    const [savedBooking, updatedUser, updatedDoctor] = await Promise.all([
      newBooking.save(),
      User.findByIdAndUpdate(userId, { $push: { bookings: newBooking._id } }, { new: true }),
      Doctor.findByIdAndUpdate(id, { $push: { appointments: newBooking._id } }, { new: true }),
    ]);

    const emailBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2 style="color: #333;">Appointment Confirmation</h2>
        <p style="font-size: 16px; color: #555;">
          Dear ${email},
        </p>
        <p style="font-size: 16px; color: #555;">
          Your appointment has been successfully scheduled.
        </p>
        <p style="font-size: 16px; color: #555;">
          <strong>Date:</strong> ${date}<br>
          <strong>Time:</strong> ${time} hrs
        </p>
        <p style="font-size: 16px; color: #555;">
          Thank you for scheduling with us. We look forward to seeing you.
        </p>
        <p style="font-size: 16px; color: #555;">
          Best regards,<br>
          HealthEase
        </p>
      </div>
    `;

    // Queue email sending, do not wait for it to complete
    mailsend(email, 'Appointment Confirmation - Your Appointment Schedule', emailBody)
      .catch(err => console.error("Error sending email:", err));

    return res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
      newBooking: savedBooking,
      updatedUser,
      updatedDoctor,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}


exports.getBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    //console.log(userId);
    
    const user = await User.findById(userId).populate({
      path: "bookings",
      populate: {
        path: "doctor"
      }
    });

    return res.status(200).json({
      success: true,
      message: "Bookings successfully fetched",
      bookings : user.bookings
    });
  } 
  catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}


exports.cancelBooking = async(req,res)=>{
  try{
    const {id} = req.body;
    const userId= req.user.id;
    const {docId}= req.body;

    const removeBookingfromUser = await User.findByIdAndUpdate(userId,{
      $pull:{
        bookings: id,
      }
    }).exec();

    const removeBookingfromDoctor  =await Doctor.findByIdAndUpdate(docId,{
      $pull:{
        appointments: id,
      }
    }).exec();

    const deleteBooking = await Booking.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Bookings successfully deleted",
    });


  }
  catch(err){
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}


exports.sendMessage = async (req, res) => {

  const { doctorId, message } = req.body;
  const userId = req.user.id;

  console.log(doctorId, message);

  try {
    
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    const newMessage = {
      user: userId,
      message: message,
    };
    doctor.messages.push(newMessage);
    
    
    await doctor.save();

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


exports.getMessages = async (req, res) => {
  try {
      const userId = req.user.id; // Assuming the authenticated user is a doctor
      const user = await User.findById(userId).populate('messages.user', 'name'); // Populate user details

      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({ 
          success: true, 
          messages: user.messages.map(msg => ({
              _id: msg._id,
              message: msg.message,
              userId: msg.user,
              user: msg.user?.name,
              timestamp: msg.createdAt
          })) 
      });
  } catch (error) {
      console.error('Error fetching messages:', error.message);
      res.status(500).json({ success: false, message: 'Server error' });
  }
};






