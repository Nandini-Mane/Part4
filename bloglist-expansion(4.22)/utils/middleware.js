const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('../models/user')

// Extracts the token from the request Authorization header and attaches it to request.token
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

// *** NEW MIDDLEWARE: userExtractor ***
// Finds the user based on the token and attaches the user object to request.user
const userExtractor = async (request, response, next) => {
  // Check if token was extracted by tokenExtractor (which should run first)
  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    // Verify the token and decode the user ID
    const decodedToken = jwt.verify(request.token, config.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    // Find the user and attach it to the request object
    request.user = await User.findById(decodedToken.id)

    if (!request.user) {
        return response.status(401).json({ error: 'user not found' })
    }
    
    next()
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: 'token invalid' })
    }
    next(error) // Pass other errors to the Express error handler
  }
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler
}