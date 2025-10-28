const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  // ❌ Validation check
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
