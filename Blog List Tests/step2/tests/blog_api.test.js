const mongoose = require('mongoose')
const supertest = require('supertest')
// Assuming 'app' exports your configured Express application
const app = require('../app') 
const Blog = require('../models/blog') 

const api = supertest(app)

// Initial state for the database for tests
const initialBlogs = [
  {
    title: 'The Modern JavaScript',
    author: 'Dan Abramov',
    url: 'http://modernjs.com/blog1',
    likes: 10
  },
  {
    title: 'Functional Programming 101',
    author: 'Kyle Simpson',
    url: 'http://fp101.net/blog2',
    likes: 5
  },
]

// Helper function to initialize the database before each test
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('Blog API tests', () => {
  
  // --- NEW TEST FOR STEP 2 ---
  test('all blogs are returned and unique identifier is named "id"', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // 1. Check that the unique identifier property is named 'id'
    const firstBlog = response.body[0]
    expect(firstBlog.id).toBeDefined()
    
    // 2. Check that the original MongoDB identifier '_id' is deleted
    expect(firstBlog._id).toBeUndefined()
  })

  // Placeholder for other tests
  test('correct number of blogs is returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

})

// Close the connection after all tests have run
afterAll(() => {
  mongoose.connection.close()
})
