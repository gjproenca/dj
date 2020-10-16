const { Router } = require('express')

const router = Router()

// Initialize Controller
const usersController = require('../controllers/usersController.js')

// Register
router.post('/user/register', usersController.register)

// Login
router.post('/user/login', usersController.login)

// Get User
router.get('/user/user', usersController.user)

module.exports = router
