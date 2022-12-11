const express = require('express');
const router = express.Router();


const ProductRoute = require("../controllers/ProductRoute")

// GET ALL
router.get('/all', ProductRoute.getProducts);
router.get('/all/cats', ProductRoute.getCats);
router.get('/all/reviews', ProductRoute.getReviewsOfProduct);

// create patient

router.post('/create', ProductRoute.createProduct);

// update patient patch || put -> same -> EDITING -> Modification

router.patch('/edit/:pateintId', ProductRoute.updateProduct);

// GET ONE PATIENT

router.get('/patient/:patientId', ProductRoute.getOneProduct);

// ROUTER FOR DELETE

router.delete('/patient/:patientId', ProductRoute.deleteItem);
