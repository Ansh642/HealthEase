const Category = require("../models/Category");
const {uploadImageToCloudinary} = require('../utils/imageUpload');
require("dotenv").config();

exports.createCategory =async(req,res)=>{
    try{
        const {name} = req.body;
        const image = req.files.image;

        if(!image || !name)
        {
            return res.status(400).json({
                success: false,
                message: "Please enter complete details",
            });
        }

        const thumbnailImage = await uploadImageToCloudinary(image,process.env.FOLDER_NAME);

        const newCategory = await Category.create({
            name: name,
            image : thumbnailImage.secure_url,
        });

        return res.status(200).json({
            success: true,
            message: "New category created successfully",
            newCategory
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.findAllCategories = async(req,res)=>{
    try{
      const allCategories = await Category.find({}, '-_id -__v');
      return res.status(200).json({
        success:true,
        allCategories
      });
    }
    catch(err)
    {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}