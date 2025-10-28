const app = require('./app') // The Express application setup
const config = require('./utils/config') // Configuration (port, etc.)
const logger = require('./utils/logger') // Logger utility

// Start the server, listening on the configured port
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
