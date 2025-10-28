const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')

const app = express()

// MongoDB connection
logger.info('connecting to', config.MONGODB_URI)

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// Middleware
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// Routes
app.get('/', (req, res) => {
  res.send('Blog API is running 🚀')
})

app.use('/api/blogs', blogsRouter)

// Unknown endpoint & error handling
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
