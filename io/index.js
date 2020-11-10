import http from 'http'
import socketIO from 'socket.io'

export default function () {
  this.nuxt.hook('render:before', (renderer) => {
    const server = http.createServer(this.nuxt.renderer.app)
    const io = socketIO(server)

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port, host) =>
      new Promise((resolve) =>
        server.listen(port || 3000, host || 'localhost', resolve)
      )
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close))

    // Add socket.io events
    io.on('connect', (socket) => {
      console.log('socket id', socket.id)
      let roomId

      socket.on('join-room', (room) => {
        roomId = room.roomId
        socket.join(roomId)
      })

      socket.on('send-message', (message) => {
        io.to(roomId).emit('new-message', message)
      })

      socket.on('new-playlist-item', (item) => {
        io.to(roomId).emit('refresh-playlist-item', item)
      })
    })
  })
}
