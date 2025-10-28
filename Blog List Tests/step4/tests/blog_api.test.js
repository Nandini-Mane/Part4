const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
})

test('if likes property is missing it defaults to 0', async () => {
  const newBlog = {
    title: 'Blog without likes field',
    author: 'Nandini',
    url: 'http://example.com/no-likes'
    // 👆 no "likes" here
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

afterAll(async () => {
  await mongoose.connection.close()
})
