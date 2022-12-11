const express = require('express');
const router = express.Router();


const productController = require("../controllers/productController")

// GET ALL
router.get('/all', productController.getProducts);
router.get('/all/cats', productController.getCats);
router.get('/all/reviews', productController.getReviewsOfProduct);

// create patient

router.post('/create', productController.createProduct);

// update patient patch || put -> same -> EDITING -> Modification

router.patch('/edit/:pro_id', productController.updateProduct);

// GET ONE PATIENT

router.get('/getOne/:pro_id', productController.getOneProduct);

// ROUTER FOR DELETE

router.delete('/delete/:pro_id', productController.deleteproduct);
