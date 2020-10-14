const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { loadNuxt, build } = require('nuxt')
const chalk = require('chalk')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

async function start() {
  // We get Nuxt instance
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  // Render every route with Nuxt.js
  app.use(nuxt.render)

  // Build only in dev mode with hot-reloading
  if (isDev) {
    build(nuxt)
  }
  // Listen the server
  server.listen(port, '0.0.0.0')
  console.log(chalk.green(`Server listening on http://localhost:${port}`))

  // Sockets
  io.on('connect', (socket) => {
    console.log(`Socket id --> ${socket.id}`)

    let roomId

    socket.on('JOIN_ROOM', function (room) {
      roomId = room._id

      socket.join(roomId)
    })

    socket.on('SEND_MESSAGE', (data) => {
      io.to(roomId).emit('MESSAGE', data)
    })
  })
}

start()
