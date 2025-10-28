const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures username is unique
    minlength: 3
  },
  name: String,
  passwordHash: { // Stores the HASHED password
    type: String,
    required: true
  },
  // Array of ObjectIds referencing the Blog model
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

// Apply the uniqueValidator plugin to the schema
userSchema.plugin(uniqueValidator)

// --- Middleware for Password Hashing (Pre-save Hook) ---
// This hook hashes the password before saving a new user to the database.
userSchema.pre('save', async function(next) {
  // Only hash if the password field is new or modified
  if (this.password && this.isModified('password')) {
    const saltRounds = 10
    this.passwordHash = await bcrypt.hash(this.password, saltRounds)
  }
  next()
})

// Transform the returned object to remove sensitive data and format fields
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // The passwordHash should not be exposed
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)
