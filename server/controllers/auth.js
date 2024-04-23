const User = require("../models/User");
const Booking = require("../models/Booking");
const bcrypt  =require("bcrypt");
require("dotenv").config();
const JWT= require("jsonwebtoken");

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


exports.login =async(req,res)=>{
    try{
      const {email,password} = req.body;

      if(!email || !password)
      {
        return res.status(400).json({
            success : false,
            message : "Please enter complete details",
        });
      }

      const userDetails = await User.findOne({email});

      if(!userDetails)
      {
        return res.status(400).json({
            success : false,
            message : "User not found",
        })
      }

      if (await bcrypt.compare(password, userDetails.password))
       {
        const payload={
            email: userDetails.email,
            id: userDetails._id,
        }

        //create a token it returns a string 
        const token = JWT.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

 
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            userDetails,
            token
        })

    
    } else {
        return res.status(401).json({
            success: false,
            message: `Password is incorrect`,
        });
    }
  }
    catch(err)
    {
        return res.status(500).json({
            success : false,
            message : err.message
        });
    }
}


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


exports.bookAppointment = async(req,res)=>{
  
    try{
      const userId = req.user.id;
      const {date,time,id} = req.body;

      if(!date || !time)
      {
        return res.status(404).json({
          success : false,
          message : "Please enter date and time",
        })
      }

      if(!userId) {
        return res.status(404).json({
          success : false,
          message : 'User must be logged in',
        })
      }
      
      //Update bookings
      const newBooking = await Booking.create({
        date : date,
        time : time,
        doctor : id,
      });

      // now update user 
      const updatedUser  = await User.findByIdAndUpdate(userId,{
        $push:{
          bookings : newBooking._id,
        }
      },{new:true}).exec();


      return res.status(200).json({
        success : true,
        message : "Book Appointment successfully",
        newBooking,
        updatedUser
      })
    }

    catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

exports.getBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: "bookings",
      populate: {
        path: "doctor"
      }
    });

    return res.status(200).json({
      success: true,
      message: "Bookings successfully fetched",
      user
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

