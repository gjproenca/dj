const chalk = require('chalk')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', () => console.log(chalk.red('MongoDB Connection Error')))
db.once('open', function callback() {
  console.log(chalk.green('MongoDB Connected'))
})

module.exports = db
