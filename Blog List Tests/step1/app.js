const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Blog = require('./models/blog')

mongoose.set('strictQuery', false)

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(express.json())

// --- API Route ---
app.get('/api/blogs', async (request, response) => {
  // Refactored to use async/await (as required by the prompt)
  const blogs = await Blog.find({})
  response.json(blogs)
})
// -----------------

module.exports = app