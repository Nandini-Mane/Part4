const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Nandini',
    url: 'http://example.com/no-title',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd).toHaveLength(0)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Missing URL Blog',
    author: 'Nandini',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd).toHaveLength(0)
})

afterAll(async () => {
  await mongoose.connection.close()
})
