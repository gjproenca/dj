const mongoose = require('mongoose')

// FIXME: mongo connection
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function callback() {
  console.log('MongoDB Connected...')
})

module.exports = db
