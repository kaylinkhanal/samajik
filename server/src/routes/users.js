const { Router } = require('express')
const { registerUser, loginUser, findAllUser, findUserById, deleteUserById, updateUserById } = require('../controllers/users');
const UserRoute = Router()

UserRoute.get('/users', findAllUser)
UserRoute.get('/users/:id', findUserById)
UserRoute.post('/register', registerUser)
UserRoute.post('/login', loginUser)
UserRoute.put('/users/:id', updateUserById)
UserRoute.delete('/users/:id', deleteUserById)

module.exports = UserRoute;
