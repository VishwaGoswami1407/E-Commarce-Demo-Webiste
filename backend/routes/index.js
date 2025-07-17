const express = require('express');
const router = express.Router();
const userRoute = require('./user');
const productRoute = require('./product');
const cartRoute = require('./cart')



router.use('/',userRoute);
router.use('/',productRoute);

router.use('/cart',cartRoute)

module.exports = router;