const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

// GET all blogs: No token/user required
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

// POST a new blog: Requires tokenExtractor AND userExtractor
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user // Access the user object from the middleware

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id // Use the ID from the user object
  })

  const savedBlog = await blog.save()
  // Populate user info for the response
  const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(populatedBlog)
})

// DELETE a blog: Requires tokenExtractor AND userExtractor
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blogId = request.params.id
  const user = request.user // Access the user object from the middleware

  const blog = await Blog.findById(blogId)

  // Check if the blog exists
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  // Check if the user is the creator of the blog
  // Must use toString() for comparison since blog.user is an ObjectId
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(403).json({ error: 'user not authorized to delete this blog' })
  }

  // Delete the blog
  await Blog.findByIdAndDelete(blogId)

  // Remove blog reference from the user's blogs array
  user.blogs = user.blogs.filter(b => b.toString() !== blogId)
  await user.save()

  response.status(204).end()
})

// PUT (update) a blog: Does not require userExtractor for a simple like update
blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, 
    { title, author, url, likes }, 
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', { username: 1, name: 1 })

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter