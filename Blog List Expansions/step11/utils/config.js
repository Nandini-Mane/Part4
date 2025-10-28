require('dotenv').config()

const PORT = process.env.PORT || 3001 // Default port if not specified

// Determine which MongoDB URI to use based on the environment
// The MONGODB_TEST_URI is used by the tests/blog_api.test.js file.
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.MONGODB_TEST_URI
  : process.env.MONGODB_URI

// The SECRET is crucial for JWT signing and verification.
const SECRET = process.env.SECRET

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET
}
