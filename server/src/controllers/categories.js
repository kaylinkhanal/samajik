const Category = require("../models/category")


const createCategories = async (req, res) => {
    Category.create(req.body)
    res.send("category created!!")
  }



 const getAllCategories =  async (req, res) => {
    const data = await Category.find()
     res.send(data)
 }



//  const findProductById = async (req, res) => {
//     const data = await Product.findById(req.params.id)
//     res.send(data)
//   }


//  const deleteProductById = async (req, res) => { 
//     const data = await Product.findByIdAndDelete(req.params.id)
//     res.send({
//       msg: `${req.params.id} product deleted!`
//     })
//   }



// const updateProductById =   async (req, res) => {
//     const data = await Product.findByIdAndUpdate(req.params.id, req.body)
//     res.send({
//       msg: `${req.params.id} product edited!`
//     })
//   }



module.exports = {createCategories,getAllCategories}