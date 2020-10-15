const { Router } = require('express')

const router = Router()

// Initialize Controller
const roomsController = require('../controllers/roomsController.js')

// Create Room
router.post('/room/create', roomsController.createRoom)

// Toggle on_air
// router.post('/user/toggle-on-air', usersController.login)

// Get Rooms
router.get('/rooms', roomsController.getRooms)

// Get Rooms On Air
router.get('/rooms/on-air', roomsController.getRoomsOnAir)

module.exports = router
