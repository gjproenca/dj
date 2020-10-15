const express = require('express')
const db = require('./db.js')
// Require & Import API routes
const users = require('./routes/users.js')
const rooms = require('./routes/rooms.js')

// Create express instnace
const app = express()

// Init body-parser options (inbuilt with express)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use API Routes
app.use(users)
app.use(rooms)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
}
