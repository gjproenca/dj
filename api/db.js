const chalk = require('chalk')
const mongoose = require('mongoose')

// FIXME: process.env
// console.log(chalk.bgCyan(process.env.CONNECTION_STRING))

mongoose.connect(process.env.CONNECTION_STRING, {
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
