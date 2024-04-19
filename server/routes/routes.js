const express = require("express");
const router = express.Router();


const {createCategory,findAllCategories} = require("../controllers/category");
const { createDoctor, getDoctors, getDoctorsByName } = require("../controllers/doctor");
const { signup, login, resetPassword } = require("../controllers/auth");

// category routes
router.post('/create-category',createCategory);
router.get('/categories',findAllCategories);

//doctor routes
router.post('/create-doctor',createDoctor);
router.get('/doctors',getDoctors);
router.get('/doctors/:name',getDoctorsByName);


//user routes
router.post('/signup',signup);
router.post('/login',login);

router.post('/reset-password',resetPassword);

module.exports = router; 

