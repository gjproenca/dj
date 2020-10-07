const jwt = require('jsonwebtoken')

const config = {
  authSecret: process.env.AUTH_SECRET,
}

module.exports = config

// check if user logged in
module.exports.isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(
      token.replace(/^Bearer\s/, ''),
      config.authSecret,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'unauthorized' })
        } else {
          return next()
        }
      }
    )
  } else {
    return res.status(401).json({ message: 'unauthorized' })
  }
}
