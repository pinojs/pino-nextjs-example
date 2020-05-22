# Pino Next.js Example

## An example of how Pino can be used in a Next.js app.

To start just clone this repo and type:

`npm run dev`

## How it works

This example shows how to use [Pino](http://getpino.io) as a logger on both browser and server independently, in a [Next.js](https://nextjs.org) project.

For this example, we have created a [Custom Server](https://nextjs.org/docs/advanced-features/custom-server) in the file [server.js](./server.js)

On the server side, the logger will be available in the request object
and can be used to log by doing: `req.log.info(msg)`

As an example, checkout [pages/api/hello.js](./pages/api/hello.js)
You can call: http://localhost:3000/api/hello and you will see the log.

On the client side, checkout [pages/index.js](./pages/index.js)

The logger object is available to use by calling `logger.info(msg)`

When it is called from the browser then the logger will send the message via an async call using `navigator.sendBeacon()` to http://localhost:3000/log which will then log the message on the server.

