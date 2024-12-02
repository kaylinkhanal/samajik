const mongoose= require("mongoose");

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true },
    type: { type: String, enum: ['Single', 'Double', 'Suite'], required: true },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    image: {type: String}
  }, { timestamps: true });

  const Room = mongoose.model('Room', roomSchema);
  const multer  = require('multer');
  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/avatar')
      },
      filename: function (req, file, cb) {
        const avatarName = req.params.id+file.originalname
        cb(null, avatarName)
      }
    })
    
    const upload = multer({ storage: storage })

  const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Confirmed', 'Pending', 'Cancelled'], default: 'Pending' },
  }, { timestamps: true });

  const Booking = mongoose.model('Booking', bookingSchema);


  const { Router } = require('express')

const hotelRoute = Router()

hotelRoute.post('/rooms', upload.single('avatar'), (req,res)=>{
    Room.create(req.body)
    res.send('room created')
})

hotelRoute.get('/rooms',async (req,res)=>{
    const data = await Room.find()
    res.send(data)
})

module.exports = hotelRoute


// ProductRoute.get('/products/:id', findProductById)
// ProductRoute.delete('/products/:id', deleteProductById)
// ProductRoute.put('/products/:id', updateProductById)
