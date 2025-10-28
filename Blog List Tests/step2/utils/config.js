const PORT = process.env.PORT || 3003

// Define the MongoDB connection URI based on the current environment
// We default to a standard development URI.
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI // Use a separate URI for testing
  : process.env.MONGODB_URI || 'mongodb://localhost:27017/bloglist_dev'

// NOTE: You must have a MongoDB instance running locally, or replace 
// 'mongodb://localhost:27017/bloglist_dev' with a valid external connection string.

module.exports = {
  MONGODB_URI,
  PORT
}
