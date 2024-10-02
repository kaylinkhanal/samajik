
const { Router } = require('express')
const { registerUser, loginUser, uploadUser, findAllUser, findUserById, deleteUserById, updateUserById, verifyCookie, logout } = require('../controllers/users');
const UserRoute = Router()
const multer = require('multer');
const User = require('../models/user');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/avatar')
  },
  filename: function(req, file, cb) {
    const avatarName = req.params.id + file.originalname
    cb(null, avatarName)
  }
})

const upload = multer({ storage: storage })

const checkUserExist = async (req, res, next) => {
  try {
    const userExist = await User.findById(req.params.id)
    if (!userExist) return res.status(404).json({ msg: "User Doesn't exist" })

    next()
  } catch (err) {
    console.log(err)
  }
}
UserRoute.get('/is-logged-in', verifyCookie)
UserRoute.get('/users', findAllUser)
UserRoute.get('/users/:id', findUserById)
UserRoute.post('/register', registerUser)
UserRoute.post('/login', loginUser)
UserRoute.post('/logout', logout)
UserRoute.post('/upload-avatar/:id', checkUserExist, upload.single('avatar'), uploadUser)
UserRoute.put('/users/:id', updateUserById)
UserRoute.delete('/users/:id', deleteUserById)

module.exports = UserRoute;
