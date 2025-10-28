require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET || 'your_super_secret_key_here' // Used for JWT signing

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET
}
