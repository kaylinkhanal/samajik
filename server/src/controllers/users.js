const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');



const registerUser = async (req, res) => {

  //step 1: check if email is taken
  const emailExists = await User.exists({ email: req.body.email })
  const phoneExists = await User.exists({ phoneNumber: req.body.phoneNumber })
  if (emailExists || phoneExists) {
    return res.status(403).send({ msg: 'Email/Phone already taken' })
  }
  //step 2: generate hash password 
  req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  //step 3: create new document in the User collection
  User.create(req.body)
  res.send({ msg: "user created!!" })
}

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(401).send({ msg: 'Invalid email!' })
  }
  const isMatched = await bcrypt.compare(req.body.password, user.password);
  if (isMatched) {
    const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
    const newUser = user.toObject()
    delete newUser.password
    res.send({ user: newUser, token, isLoggedIn: true })
  } else {
    res.status(401).send({ msg: 'invalid credentials!' })
  }
}

const changeUserPassword = async (req, res) => {
  const user = await User.findById(req.params.userId)
  const isMatched = await bcrypt.compare(req.body.oldPassword, user.password);
  if (isMatched) {
    user.password =  await bcrypt.hash(req.body.newPassword, saltRounds);
    user.save()
    res.send({msg: 'Password Changed successfully!'})
  } else {
    res.status(401).send({ msg: 'Incorrect Password!' })
  }
}


const findAllUser = async (req, res) => {
  if(!req.query.startsWith) return res.send([])
  const data = await User.find({fullName:  { $regex: req.query.startsWith, $options: 'i' } })
  res.send(data)
}

const findUserById = async (req, res) => {
  const user = await User.findById(req.params.id).lean()
  res.send({
    ...user,
    followersCount: user.followers.length,
    followingCount: user.following.length
  })
}

const getFollowersList = async (req, res) => {
  const user = await User.findById(req.params.userId).select('followers').populate('followers')
  res.send(user)
}

const getFollowingList = async (req, res) => {
  const user = await User.findById(req.params.userId).select('following').populate('following')
  res.send(user)
}




const followUser = async (req, res) => {
 const {requestedby, requestedto} = req.params

 const requestedUser = await User.findById(requestedby)
 requestedUser.following.push(requestedto)
 requestedUser.save()

 const followRequestedToUser = await User.findById(requestedto)
 followRequestedToUser.followers.push(requestedby)
followRequestedToUser.save()
 

res.send({msg : "You have started following the user!!"})
}






const deleteUserById = async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id)
    res.send({
      msg: `${req.params.id} user deleted!`
    })

  } catch (error) {
    res.send({
      msg: `${req.params.id} unable to delete user!`
    })
    console.log(error)
  }
}

const updateUserById = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      msg: `${req.params.id} user edited!`
    })
  } catch (error) {
    res.send({
      msg: `${req.params.id} unable to edit user!`
    })
    console.log(error)
  }
}

//req.params /
//req.query ?
//req.body {}
//req.file
  const uploadUser = async (req, res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return res.status(404).send('User Id is invalid')
    }
    user.avatar = req.file.filename
    user.save()
    res.json({
      msg: "Avatar Upload Success"
    })
  }

  module.exports = {
    registerUser,
    loginUser,
    uploadUser,
    findAllUser,
    findUserById,
    deleteUserById,
    updateUserById,
    followUser,
    getFollowersList,
    getFollowingList,
    changeUserPassword

  }
