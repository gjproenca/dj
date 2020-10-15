const chalk = require('chalk')
const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', () => console.log(chalk.red('MongoDB Connection Error')))
db.once('open', () => {
  console.log(chalk.green('MongoDB Connected'))
})

module.exports = db
