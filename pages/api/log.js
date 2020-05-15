const logger = require('pino')()

export default (req, res) => {
  const { msg, level = 'info' } = req.body
  logger[level](msg)
  res.statusCode = 200
  res.json({ logged: 'message logged on server' })
}
