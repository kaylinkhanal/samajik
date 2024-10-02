const { Router } = require('express')
const { createProduct, getAllProducts, findProductById, deleteProductById, updateProductById } = require('../controllers/products')

const ProductRoute = Router()

ProductRoute.post('/products', createProduct)
ProductRoute.get('/products', getAllProducts)
ProductRoute.get('/products/:id', findProductById)
ProductRoute.delete('/products/:id', deleteProductById)
ProductRoute.put('/products/:id', updateProductById)

module.exports = ProductRoute;
