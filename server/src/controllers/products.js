const Product = require("../models/product")

const createProduct = async (req, res) => {
    Product.create(req.body)
    res.send("product created!!")
  }



 const getAllProducts =  async (req, res) => {
    const data = await Product.find()
     res.send(data)
 }



 const findProductById = async (req, res) => {
    const data = await Product.findById(req.params.id)
    res.send(data)
  }


 const deleteProductById = async (req, res) => { 
    const data = await Product.findByIdAndDelete(req.params.id)
    res.send({
      msg: `${req.params.id} product deleted!`
    })
  }



const updateProductById =   async (req, res) => {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      msg: `${req.params.id} product edited!`
    })
  }



module.exports = {createProduct, getAllProducts, findProductById, deleteProductById, updateProductById}