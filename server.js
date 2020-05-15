// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

var logger = require('pino-http')()

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/log') {
        let data = null
        req.on('data', chunk => {
            data = chunk
        })
        req.on('end', () => {
            const { msg, level = 'info' } = JSON.parse(data)
            logger(req, res)
            req.log[level](msg)
        })
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('logged on server');
    }
    else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})