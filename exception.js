export class HttpException extends Error {
  constructor(code, message, stack = '') {
    super(message)
    this.message = message
    this.code = code
    this.name = HttpException.name
    if (!stack) {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = stack
    }
  }
}

export class NotFound extends HttpException {
  constructor(message, stack = '') {
    super(404, message, stack)
  }
}

export class BadRequest extends HttpException {
  constructor(message, stack = '') {
    super(400, message, stack)
  }
}
