const bunyan = require('bunyan')
const logger = bunyan.createLogger({ name: 'cloaked:test'})

module.exports = (app) => {
  // Add a logger to our app object for convenience
  app.logger = logger

  return (error, req, res, next) => {
    if (error) {
      const message = `${error.status ? `(${error.status}) ` : '' }Route: ${req.url} - ${error.message}`

      if (error.status === 404) {
        logger.info(message)
      }
      else {
        logger.error(message)
        logger.info(error.stack)
      }
    }
    next(error)
  }
}
