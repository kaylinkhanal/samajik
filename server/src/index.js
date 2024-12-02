const express = require('express') //commonjs
const app = express()
const UserRoute = require('./routes/users')
const ProductRoute = require('./routes/products')
const CategoryRoute = require('./routes/categories')
const PostRoute = require('./routes/posts')
const hotelRoute = require('./routes/hotel')


const cors = require('cors')
const connection = require('./db/connection')
require('dotenv').config() // consume external .env
const path = require('path')
connection()

const port = process.env.PORT

app.use('/static', express.static(path.join(__dirname, '../uploads')))


app.use(express.json()) //body parser
app.use(cors())
app.use(UserRoute)
app.use(ProductRoute)
app.use(PostRoute)
app.use(CategoryRoute)
app.use(hotelRoute)

app.listen(port, ()=>{
    console.log("server is started in port" + port)
})