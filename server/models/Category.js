const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true,
    },

    doctors:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor", 
    }],
    image:{
        type:String,
        required:true,
    },

});

module.exports = mongoose.model("Category", categorySchema);

