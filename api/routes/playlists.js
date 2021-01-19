const { Router } = require('express')
const config = require('../config.js')

const router = Router()

// Initialize Controller
const playlistsController = require('../controllers/playlistsController.js')

// Create Playlist
router.post(
  '/playlist',
  config.isAuthenticated,
  playlistsController.createPlaylist
)

// Read Playlist
router.get(
  '/playlist',
  config.isAuthenticated,
  playlistsController.readPlaylist
)

router.get(
  '/playlist/refresh',
  config.isAuthenticated,
  playlistsController.refreshPlaylist
)

module.exports = router
