const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0
  },
})

// Configure the schema transformation when converting a document to JSON
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // 1. Convert the internal _id object to a string and name it 'id'
    returnedObject.id = returnedObject._id.toString()

    // 2. Delete the internal MongoDB ID field
    delete returnedObject._id

    // 3. Delete the Mongoose version key
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
