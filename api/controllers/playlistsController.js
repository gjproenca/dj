const validator = require('express-validator')
// const mongoose = require('mongoose')
const Playlist = require('../models/Playlist.js')

// Create Playlist
module.exports.createPlaylist = [
  // validation rules
  validator
    .body('playlist_id', 'Please enter the Playlist Id')
    .isLength({ min: 1 }),
  validator
    .body('playlist_items', 'Please enter the Playlist Items')
    .isLength({ min: 1 }),

  (req, res) => {
    // throw validation errors
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }

    // initialize record
    const playlist = new Playlist({
      playlist_id: req.body.playlist_id,
      playlist_items: req.body.playlist_items,
    })

    // save record
    playlist.save((error, playlist) => {
      if (error) {
        return res.status(500).json({
          message: 'Error saving record',
          error,
        })
      }
      return res.json({
        message: 'Record saved',
        _id: playlist._id,
      })
    })
  },
]

// Read Playlist
module.exports.readPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      playlist_id: req.body.playlist_id,
    }).orFail()
    return res.status(200).json({ playlist })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
