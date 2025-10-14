const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

// --- Test Data ---
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
  { _id: "5a422a851b54a676234d17f7", title: "React patterns", likes: 7, author: "Michael Chan", __v: 0 },
  { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", likes: 5, author: "Edsger W. Dijkstra", __v: 0 },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string representation of JSON",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", likes: 10, __v: 0 },
]

// --- Exercise 4.3: dummy ---
test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

// --- Exercise 4.4: totalLikes ---
describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
  })

  test('of a bigger list is calculated right', () => {
    const total = 7 + 5 + 12 + 10
    assert.strictEqual(listHelper.totalLikes(listWithMultipleBlogs), total)
  })
})

// --- Exercise 4.5: favoriteBlog ---
describe('favorite blog', () => {
  const favorite = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string representation of JSON",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }

  test('of an empty list is null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })

  test('when list has only one blog, equals that blog', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), listWithOneBlog[0])
  })

  test('of a bigger list is found correctly', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithMultipleBlogs), favorite)
  })
})

// --- Exercise 4.6: mostBlogs ---
describe('most blogs', () => {
  const blogs = [
    { title: "React patterns", author: "Michael Chan", likes: 7 },
    { title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", likes: 5 },
    { title: "Canonical string representation of JSON", author: "Edsger W. Dijkstra", likes: 12 },
    { title: "First class tests", author: "Robert C. Martin", likes: 10 },
    { title: "TDD harms architecture", author: "Robert C. Martin", likes: 0 },
    { title: "Type wars", author: "Robert C. Martin", likes: 2 },
  ]

  const expectedAuthor = {
    author: "Robert C. Martin",
    blogs: 3,
  }

  test('of an empty list is null', () => {
    assert.strictEqual(listHelper.mostBlogs([]), null)
  })

  test('when list has only one blog, equals that author', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  test('of a bigger list is found correctly', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), expectedAuthor)
  })
})

// --- Exercise 4.7: mostLikes ---
describe('most likes', () => {
  const blogs = [
    { title: "React patterns", author: "Michael Chan", likes: 7 },
    { title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", likes: 5 },
    { title: "Canonical string representation of JSON", author: "Edsger W. Dijkstra", likes: 12 },
    { title: "First class tests", author: "Robert C. Martin", likes: 10 },
    { title: "TDD harms architecture", author: "Robert C. Martin", likes: 0 },
    { title: "Type wars", author: "Robert C. Martin", likes: 2 },
  ]
  const expectedAuthor = {
    author: "Edsger W. Dijkstra",
    likes: 17
  }

  test('of an empty list is null', () => {
    assert.strictEqual(listHelper.mostLikes([]), null)
  })

  test('when list has only one blog, equals that author', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), {
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of a bigger list is found correctly', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs), expectedAuthor)
  })
}) 
