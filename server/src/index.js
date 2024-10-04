const express = require('express') //commonjs
const app = express()
const UserRoute = require('./routes/users')
const ProductRoute = require('./routes/products')
const cors = require('cors')
const connection = require('./db/connection')
require('dotenv').config()
const path = require('path')
const cookieParser = require('cookie-parser')
connection()

const PORT = process.env.PORT

app.use('/static', express.static(path.join(__dirname, '../uploads')))
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(UserRoute, ProductRoute)

app.listen(PORT, () => {
  console.log("server is started in port" + PORT)
})
