const express = require('express')
const loginRouter = express.Router()

loginRouter.post('/', (req, res) => {
  res.json({ message: 'Login endpoint works!' })
})

module.exports = loginRouter
