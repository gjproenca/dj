/* eslint-disable no-console */
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { loadNuxt, build } = require('nuxt')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3001

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
  console.log('Server listening on `localhost:' + port + '`.')

  io.on('connection', function (socket) {
    console.log(`Socket id --> ${socket.id}`)

    socket.on('SEND_MESSAGE', function (data) {
      io.emit('MESSAGE', data)
    })
  })
}

start()
