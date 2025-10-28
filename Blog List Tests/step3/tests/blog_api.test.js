const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'First blog',
    author: 'Alice',
    url: 'http://example.com/first',
    likes: 5
  },
  {
    title: 'Second blog',
    author: 'Bob',
    url: 'http://example.com/second',
    likes: 8
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New test blog',
    author: 'Charlie',
    url: 'http://example.com/test',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('New test blog')
})

afterAll(async () => {
  await mongoose.connection.close()
})
