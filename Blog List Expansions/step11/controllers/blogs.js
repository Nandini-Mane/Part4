const express = require('express')
const blogsRouter = express.Router()

blogsRouter.get('/', (req, res) => {
  res.json([{ title: 'First blog', author: 'Nandini' }])
})

module.exports = blogsRouter
