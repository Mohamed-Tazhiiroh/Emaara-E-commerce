const express = require('express');
const router = express.Router();

const categoryController = require("../controllers/categoryController")
// const { protect } = require('../middlewares/auth');


// ------------------ROUTES   LINKS-----------------------

// GET ALL
router.get('/all', categoryController.Getall);

// create patient
router.post('/create',  categoryController.createCategory);

// update category patch || put -> same -> EDITING -> Modification
router.patch('/:category_ID', categoryController.updateCategory);


// ROUTER FOR DELETE
router.delete('/:category_ID', categoryController.deleteCategory);



module.exports= router