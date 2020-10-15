const { Router } = require('express')
// const config = require('../config.js')

const router = Router()

// Initialize Controller
const roomsController = require('../controllers/roomsController.js')

// Create Room
router.post('/room/create', roomsController.createRoom)

// // Login
// router.post('/user/login', usersController.login)

// // Get User
// router.get('/user/user', usersController.user)

module.exports = router
