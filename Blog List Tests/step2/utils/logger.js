const info = (...params) => {
  // Only log info messages in development/staging environments, not during testing
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  // Always log errors
  console.error(...params)
}

module.exports = {
  info,
  error
}
