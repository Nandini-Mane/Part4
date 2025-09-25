 
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blog posts are returned', async () => {
  // Insert some test data directly into the test database
  const initialBlogs = [
    { title: 'Testing with SuperTest', author: 'Test Author', url: 'http://test.com/1', likes: 5 },
    { title: 'Async Await Refactor', author: 'Node Expert', url: 'http://test.com/2', likes: 10 }
  ]

  // Cleanup and populate the test database (Essential for robust tests!)
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  // Make the request and verify the count
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})