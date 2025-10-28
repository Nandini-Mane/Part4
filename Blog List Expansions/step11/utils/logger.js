const info = (...params) => {
  // Only log info messages if not in test mode
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info,
  error
}
