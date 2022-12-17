const express = require('express')
const router = express.Router();

const cartController = require('../controllers/cartController')


// ROUTES


// create or add to cart

router.post('/addtocart', cartController.addToCart)
router.get('/all', cartController.getMyCart)
router.delete('/deleteall', cartController.emptyAllCart)
router.delete('/deleteone', cartController.deleteItem)

module.exports = router