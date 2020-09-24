const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello API'))

module.exports = {
  path: '/api/',
  handler: app,
}
