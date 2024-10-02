const express = require('express') //commonjs
const app = express()
const UserRoute = require('./routes/users')
const ProductRoute = require('./routes/products')
const cors = require('cors')
const connection = require('./db/connection')
require('dotenv').config()
const path = require('path')
connection()

const port = process.env.PORT


app.use('/static', express.static(path.join(__dirname, '../uploads')))


app.use(express.json())
app.use(cors())
app.use(UserRoute)
app.use(ProductRoute)

app.listen(port, ()=>{
    console.log("server is started in port" + port)
})