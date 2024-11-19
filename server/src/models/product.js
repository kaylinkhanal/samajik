const mongoose  = require("mongoose");

const Product = mongoose.model('Product', {
    productName: String,
    productPrice: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    description: String,
 });

 module.exports = Product

 