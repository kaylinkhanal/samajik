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
  if (!user) return res.status(401).send({ msg: 'Invalid email!' })

  const isMatched = await bcrypt.compare(req.body.password, user.password);
  if (!isMatched) return res.status(401).send({ msg: 'invalid credentials!' })
  try {
    const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
    const newUser = user.toObject()
    res.cookie('token', token, { httpOnly: true, secure: false })
    return res.send({ user: newUser, isLoggedIn: true })
  } catch (err) {
    console.log("unable to sing jwt->", req.body.email, process.env.SECRET_KEY)
    return res.status(500).send({ msg: 'server error!' })
  }
}
const logout = async (_, res) => {
  res.clearCookie('token');
  res.json(true)
}
const verifyCookie = async (req, res) => {
  const { token } = req.cookies
  console.log(token)
  if (!token) return res.json({ isLoggedIn: false })
  try {
    const { email } = jwt.verify(token, process.env.SECRET_KEY)
    if (!email) return res.json({ isLoggedIn: false })
    const user = await User.findOne({ email })
    if (!user) return res.json({ isLoggedIn: false })
    const userObj = user.toObject()
    delete userObj.password
    return res.json({ isLoggedIn: true, user: userObj })
  } catch (err) {
    console.log(err)
    return res.json({ isLoggedIn: false })
  }
}
const findAllUser = async (_, res) => {
  const data = await User.find()
  res.send(data)
}

const findUserById = async (req, res) => {
  const data = await User.findById(req.params.id)
  res.send(data)
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
const uploadUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
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
  verifyCookie,
  logout
}
