const express = require('express');
const { cart, addCart, updateCart, updateQuantity, payment } = require('../controllers/cart.controller');
const router = express.Router();



//route to get cart
router.get('/userCart',cart)
router.post('/add',addCart);
router.put("/update", updateCart);
router.put("/update/quantity", updateQuantity);
router.post("/payment",payment);


module.exports = router;
