const { Router } = require('express')
const { createCategories,getAllCategories } = require('../controllers/categories')

const ProductRoute = Router()

ProductRoute.post('/categories', createCategories)
ProductRoute.get('/categories', getAllCategories)
// ProductRoute.get('/products/:id', findProductById)
// ProductRoute.delete('/products/:id', deleteProductById)
// ProductRoute.put('/products/:id', updateProductById)

module.exports = ProductRoute;
