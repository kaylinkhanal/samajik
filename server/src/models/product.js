const mongoose  = require("mongoose");

const Product = mongoose.model('Product', {
    productName: String,
    productPrice: Number,
    description: String,
 });

 module.exports = Product

 