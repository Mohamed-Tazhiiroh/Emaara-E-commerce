const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
// const { protect } = require('../middlewares/auth');

// GET ALL
// router.get('/all', productController.getAllProducts);

// create Product

router.post('/create', productController.CreateProduct);

// update Product patch || put -> same -> EDITING -> Modification

router.patch('/edit/:pro_id', productController.updateProduct);

// GET ONE Product

router.get('/getOne/:pro_id', productController.getOneProduct);

// ROUTER FOR DELETE

router.delete('/:pro_id', productController.deleteProduct);

// // TESTING MIDDLEWARE

// router.get('/get', protect);

// DELETE ALL

router.delete('/all', productController.deleteAllItems);

module.exports = router;
