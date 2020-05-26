// server.js
const { createServer } = require('http')
const { parse } = require('url')
const stream = require('stream')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// this is the logger for the server
var logger = require('pino-http')()

const okResponse = res => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('message logged on server')
}

const errorResponse = res => {
  res.statusCode = 500
  res.setHeader('Content-Type', 'text/plain')
  res.end('error ocurred when logging on server')
}


app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    logger(req, res)

    if (pathname === '/log') {
        req.setEncoding('utf8')
        let data = ''
        req.on('data', chunk => {
            data += chunk
        })
        stream.finished(req, (err) => {
          if (err) {
            req.log.error(err)
            return errorResponse(res)
          }
          try {
            const { msg, level = 'info' } = JSON.parse(data)
            req.log[level](msg)
          } catch (err) {
            return errorResponse(res)
          }
          return okResponse(res)
        })
    }
    else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})