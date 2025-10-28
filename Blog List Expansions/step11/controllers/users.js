const express = require('express')
const usersRouter = express.Router()

usersRouter.get('/', (req, res) => {
  res.json([{ name: 'Nandini', username: 'nandini123' }])
})

module.exports = usersRouter
