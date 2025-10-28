const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// The server starts listening on the port specified in config.js
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
