const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required: true,
        trim: true,
    },
    password: {
        type:String,
        required: true,
    },

    email:{
        type:String,
        required: true,
    },
    years:{
        type:Number,
        required: true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category", 
    },
    about:{
        type:String,
        required: true,

    },
    address:{
        type:String,
        required: true,

    },
    image:{
        type:String,
        required:true,
    },
    appointments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", 
    }],
    phone:{
        type:Number,
        required:true,
    }

});

module.exports = mongoose.model("Doctor", doctorSchema);