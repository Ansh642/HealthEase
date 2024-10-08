const express = require("express");
const router = express.Router();

const {createCategory,findAllCategories} = require("../controllers/category");
const { createDoctor, getDoctors, getDoctorsByName, doctorDetails, searchDoctor, getAppointments, completeAppointments, sendMessages, getNotifications } = require("../controllers/doctor");
const { signup, login, resetPassword, bookAppointment, getBookings, cancelBooking, sendMessage, getMessages } = require("../controllers/auth");
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
router.post('/complete-appointment',auth,completeAppointments);
router.post('/send-messages', auth,sendMessages); 
router.get('/doctor-messages', auth, getNotifications);

//user routes
router.post('/signup',signup);
router.post('/login',login);
router.post('/book-appointment',auth,bookAppointment)
router.post('/reset-password',resetPassword);
router.get('/get-bookings',auth,getBookings);
router.post('/delete-booking',auth,cancelBooking);
router.post('/search',searchDoctor);
router.get("/user-auth", auth, (req, res) => {res.status(200).send({ ok: true });});
router.post('/send-message', auth,sendMessage); 
router.get('/user-messages', auth, getMessages);

module.exports = router; 

