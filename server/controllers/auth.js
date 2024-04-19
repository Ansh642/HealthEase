const User = require("../models/User");
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
