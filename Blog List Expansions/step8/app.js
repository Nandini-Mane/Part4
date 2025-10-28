const config = require('./utils/config')
const express = require('express')
// This package is used to handle errors in async route handlers automatically
require('express-async-errors') 
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

// --- Database Connection ---
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// --- Standard Middlewares ---
app.use(cors())
app.use(express.json())

// 1. Request Logger
app.use(middleware.requestLogger)

// 2. Token Extractor: This middleware runs for all requests.
//    It extracts the JWT token from the Authorization header and attaches it 
//    to the request object as `request.token`. 
//    It MUST be registered before any routes that require token access.
app.use(middleware.tokenExtractor)

// --- Route Registration ---
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

// --- Error Handlers (must be registered last) ---
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
