const logger = require('pino')()

export default (req, res) => {
  logger.info('/api/hello')
  res.statusCode = 200
  res.json({ msg: 'hi there' })
}
