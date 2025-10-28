const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config') // Assumes you have a config file for environment variables
const logger = require('./utils/logger') // Simple logger utility
const blogsRouter = require('./controllers/blogs') // Router for blog API endpoints

logger.info('connecting to', config.MONGODB_URI)

// --- Database Connection ---
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// --- Middleware ---
// Enable cross-origin requests
app.use(cors()) 

// Serve static files (if needed, commented out for API focus)
// app.use(express.static('build')) 

// Parse incoming requests with JSON payloads
app.use(express.json())

// --- Routes ---
// Use the blogs router for all requests starting with /api/blogs
app.use('/api/blogs', blogsRouter)

// --- Error Handling Middleware (can be added later) ---
// const middleware = require('./utils/middleware')
// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

module.exports = app
