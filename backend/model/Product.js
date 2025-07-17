const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name:{
        type : String,
        required: true,
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String
    }
    ,
    description:{
        type:String
    },
    brand:{
        type:String
    },
    stock:{
        type: Number
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
})

const Product = mongoose.model("Product",productSchema);
module.exports = {Product};