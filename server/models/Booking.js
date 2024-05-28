const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date:{
        type:String,
        required: true,
    },

    time:{
        type:String,
        required: true,
    },
    doctor:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Doctor"
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }

});

module.exports = mongoose.model("Booking", bookingSchema);

