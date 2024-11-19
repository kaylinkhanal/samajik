const mongoose  = require("mongoose");

const Category = mongoose.model('Category', {
    categoryName: String,
    categoryImage: String,
    description: String,
    isFeatured: Boolean
 });

 module.exports = Category

 