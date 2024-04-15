const express = require("express");
const router = express.Router();


const {createCategory,findAllCategories} = require("../controllers/category");

// category routes
router.post('/create-category',createCategory);
router.get('/categories',findAllCategories);

module.exports = router;