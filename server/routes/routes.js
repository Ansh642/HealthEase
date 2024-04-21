const express = require("express");
const router = express.Router();


const {createCategory,findAllCategories} = require("../controllers/category");
const { createDoctor, getDoctors, getDoctorsByName, doctorDetails } = require("../controllers/doctor");
const { signup, login, resetPassword, bookAppointment } = require("../controllers/auth");
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

module.exports = router; 

