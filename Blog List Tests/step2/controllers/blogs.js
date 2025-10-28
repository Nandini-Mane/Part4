const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// --- GET /api/blogs ---
// Fetches all blog posts from the database.
blogsRouter.get('/', async (request, response) => {
  // Find all documents in the Blog collection.
  // Mongoose automatically calls the toJSON method (which handles the _id -> id transformation)
  // before sending the response.
  const blogs = await Blog.find({})
  
  // Respond with the list of blogs
  response.json(blogs)
})


// --- POST /api/blogs ---
// Creates a new blog post.
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  // Create a new Blog document instance
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    // Use default value defined in schema (0) if likes is missing, or use the provided value
    likes: body.likes
  })

  // Save the new blog to the database
  const savedBlog = await blog.save()

  // Respond with the created blog object (which will also have the 'id' field due to toJSON)
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
