const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  years: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  about: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  }],
  phone: {
    type: Number,
    required: true,
  },
  messages: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: '3d', 
    },
  }],
});

module.exports = mongoose.model("Doctor", doctorSchema);
