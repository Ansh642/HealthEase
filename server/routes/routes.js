const express = require("express");
const router = express.Router();


const {createCategory,findAllCategories} = require("../controllers/category");
const { createDoctor, getDoctors } = require("../controllers/doctor");

// category routes
router.post('/create-category',createCategory);
router.get('/categories',findAllCategories);


router.post('/create-doctor',createDoctor);
router.get('/doctors',getDoctors);
module.exports = router; 

