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

