const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Define the schema for a blog
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

// Create the model
const Blog = mongoose.model('Blog', blogSchema)

// NOTE: You must replace 'mongodb://localhost/bloglist' with your actual MongoDB Atlas connection string
// or ensure your local MongoDB instance is running.
const mongoUrl = 'mongodb://localhost/bloglist' 
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
  })

app.use(express.json()) // Middleware to parse JSON bodies

// GET endpoint to fetch all blogs
app.get('/api/blogs', (request, response) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs)
    })
    .catch((error) => {
      console.error(error)
      response.status(500).json({ error: 'Failed to fetch blogs' })
    })
})

// POST endpoint to add a new blog
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save()
    .then((result) => {
      response.status(201).json(result) // 201 Created status
    })
    .catch((error) => {
      console.error(error)
      response.status(400).json({ error: 'Failed to save blog' }) // 400 Bad Request
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})