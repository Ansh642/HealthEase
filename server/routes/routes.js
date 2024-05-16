const express = require("express");
const router = express.Router();

const {createCategory,findAllCategories} = require("../controllers/category");
const { createDoctor, getDoctors, getDoctorsByName, doctorDetails, searchDoctor } = require("../controllers/doctor");
const { signup, login, resetPassword, bookAppointment, getBookings, cancelBooking } = require("../controllers/auth");
const { auth } = require("../middleware/middleware");

// category routes
router.post('/create-category',createCategory);
router.get('/categories',findAllCategories);

//doctor routes
router.post('/create-doctor',createDoctor);
router.get('/doctors',getDoctors);
router.get('/doctors/:name',getDoctorsByName);
router.get('/doctor/:id',doctorDetails);

//user routes
router.post('/signup',signup);
router.post('/login',login);
router.post('/book-appointment',auth,bookAppointment)
router.post('/reset-password',resetPassword);
router.get('/get-bookings',auth,getBookings);
router.post('/delete-booking',auth,cancelBooking);
router.post('/search',searchDoctor);

module.exports = router; 

