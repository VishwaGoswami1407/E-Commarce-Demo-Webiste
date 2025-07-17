const express = require('express');
const router = express.Router();
const {product, addProduct, singleProduct, deleteProduct, updateProduct} = require("../controllers/product.controller");

//Task one see all the product
router.get('/products',product);

//task 2 add product
router.post("/add-product",addProduct )
//task3 -> see single product
router.get('/product/:id',singleProduct)

//task4 -> update product
router.put('/edit/:id',updateProduct)

//task 5 -> delete product
router.delete('/delete/:id',deleteProduct)



module.exports = router;