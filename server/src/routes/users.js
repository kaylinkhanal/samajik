
const {Router} = require('express')
const { registerUser, loginUser,getFollowersList, uploadUser,followUser, findAllUser, findUserById, deleteUserById, updateUserById, getFollowingList , changeUserPassword} = require('../controllers/users');
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
    try{
      const userExist = await User.findById(req.params.id)
      if(!userExist) return res.status(404).json({msg: "User Doesn't exist"})
  
      next()
    }catch(err){
      console.log(err)
    }
  }

UserRoute.post('/register', registerUser)
UserRoute.post('/login',loginUser)
UserRoute.get('/users',  findAllUser)
UserRoute.post('/upload-avatar/:id',checkUserExist, upload.single('avatar'), uploadUser)
UserRoute.get('/users/:id',findUserById)
UserRoute.delete('/users/:id',deleteUserById )
UserRoute.put('/users/:id', updateUserById)
UserRoute.delete('/users/:id', deleteUserById)
UserRoute.put('/follow/:requestedby/:requestedto', followUser)
UserRoute.get('/followers/:userId', getFollowersList)
UserRoute.get('/following/:userId', getFollowingList)
UserRoute.patch('/change-password/:userId', changeUserPassword)
module.exports = UserRoute;
