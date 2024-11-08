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

const findAllUser = async (_, res) => {
  const data = await User.find()
  res.send(data)
}

const findUserById = async (req, res) => {
  const user = await User.findById(req.params.id)
  res.send({user})
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
    updateUserById
  }
