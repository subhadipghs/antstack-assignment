import e from 'express'
import morgan from 'morgan'
import {api} from './api/index.js'
import {logger} from './logger.js'
import {HttpException, NotFound} from './exception.js'

// app instance
var app = e()

app.use(morgan('tiny'))
app.use(e.json())
app.use('/v1', api)

// 404 not found handler
app.use('*', (_, res) => {
  const notFound = new NotFound('Path not found')
  return res.status(notFound.code).json({
    success: false,
    message: notFound.message,
  })
})

// error handler
app.use(function (error, _req, res, _next) {
  if (error) {
    logger.error(error)
    let code = 500 // default status code is 500
    if (error instanceof HttpException) {
      code = error.code
    }
    return res.status(code).json({
      success: false,
      message: error.message,
    })
  }
})

export {app}
