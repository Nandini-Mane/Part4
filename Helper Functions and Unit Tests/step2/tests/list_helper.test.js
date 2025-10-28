const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

// Test for Exercise 4.3 (dummy)
test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

// --- Tests for Exercise 4.4 (totalLikes) ---
describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogs = [
    { title: "React patterns", likes: 7, },
    { title: "Go To Statement Considered Harmful", likes: 5, },
    { title: "Canonical string representation of JSON", likes: 12, }
  ]
  const listWithNoBlogs = []

  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes(listWithNoBlogs), 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
  })

  test('of a bigger list is calculated right', () => {
    // Total likes: 7 + 5 + 12 = 24
    assert.strictEqual(listHelper.totalLikes(listWithMultipleBlogs), 24)
  })
})