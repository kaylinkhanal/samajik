
const {Router} = require('express')
const { registerUser, loginUser, uploadUser, findAllUser, findUserById, deleteUserById, updateUserById } = require('../controllers/users');
const UserRoute = Router()
const multer  = require('multer');
const User = require('../models/user');
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

  const checkUserExist =async (req,res,next)=>{
    const userExist = await User.findById(req.params.id)
    if(!userExist) return res.status(404).json({msg: "User Doesn't exist"})
    next()
  }

UserRoute.post('/register', registerUser)
UserRoute.post('/login',loginUser)
UserRoute.get('/users',  findAllUser)
UserRoute.post('/upload-avatar/:id',checkUserExist, upload.single('avatar'), uploadUser)
UserRoute.get('/users/:id',findUserById)
UserRoute.delete('/users/:id',deleteUserById )
UserRoute.put('/users/:id', updateUserById)


module.exports = UserRoute;