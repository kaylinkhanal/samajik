
const {Router} = require('express')
const { registerUser, loginUser, findAllUser, findUserById, deleteUserById, updateUserById } = require('../controllers/users');
const UserRoute = Router()

UserRoute.post('/register', registerUser)
UserRoute.post('/login',loginUser)
UserRoute.get('/users', findAllUser)
UserRoute.get('/users/:id',findUserById)
UserRoute.delete('/users/:id',deleteUserById )
UserRoute.put('/users/:id', updateUserById)


module.exports = UserRoute;