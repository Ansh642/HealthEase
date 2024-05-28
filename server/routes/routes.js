const express = require("express");
const router = express.Router();

const {createCategory,findAllCategories} = require("../controllers/category");
const { createDoctor, getDoctors, getDoctorsByName, doctorDetails, searchDoctor, getAppointments, cancelAppointments } = require("../controllers/doctor");
const { signup, login, resetPassword, bookAppointment, getBookings, cancelBooking } = require("../controllers/auth");
const { auth, isDoctor } = require("../middleware/middleware");

// category routes
router.post('/create-category',createCategory);
router.get('/categories',findAllCategories);


//doctor routes
router.post('/create-doctor',createDoctor);
router.get('/doctors',getDoctors);
router.get('/doctors/:name',getDoctorsByName);
router.get('/doctor/:id',doctorDetails);
router.get("/doctor-auth", auth,isDoctor, (req, res) => {res.status(200).send({ ok: true });});
router.get('/get-appointments',auth,getAppointments);
router.post('/delete-appointment',auth,cancelAppointments);

//user routes
router.post('/signup',signup);
router.post('/login',login);
router.post('/book-appointment',auth,bookAppointment)
router.post('/reset-password',resetPassword);
router.get('/get-bookings',auth,getBookings);
router.post('/delete-booking',auth,cancelBooking);
router.post('/search',searchDoctor);
router.get("/user-auth", auth, (req, res) => {res.status(200).send({ ok: true });});
  
  
module.exports = router; 

