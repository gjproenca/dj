const { Router } = require('express')
const config = require('../config.js')

const router = Router()

// Initialize controller
const roomsController = require('../controllers/roomsController.js')

// Create room
router.post('/room', config.isAuthenticated, roomsController.createRoom)

// Read room
router.get('/room', config.isAuthenticated, roomsController.readRoom)

// Read rooms
router.get('/rooms', config.isAuthenticated, roomsController.readRooms)

// Read Rooms live
router.get('/rooms/live', config.isAuthenticated, roomsController.readRoomsLive)

module.exports = router
