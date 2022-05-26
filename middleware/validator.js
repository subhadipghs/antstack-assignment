import Joi from 'joi'
import {logger} from '../logger.js'
import {BadRequest} from '../exception.js'

export class ValidationMiddleware {
  // factor method to create a validation middleware
  // @param {Joi.Schema} schema - joi schema for vaidation
  static createPayloadValidationMiddleware(schema) {
    return (request, _, next) => {
      try {
        const payload = request.body
        if (Object.keys(payload).length <= 0) {
          return next(new BadRequest('request payload is required'))
        }

        // validate the payload
        const {value, error} = Joi.compile(schema)
          .prefs({errors: {label: 'key'}})
          .validate(payload)

        // check whether the error exists
        if (error) {
          const msg = error.details.map((detail) => detail.message).join(', ')
          logger.error(error)
          return next(new BadRequest(msg))
        }

        // if all goes well then re-attach the value in the request body
        request.body = value
        return next()
      } catch (e) {
        logger.error(e)
        return next(e)
      }
    }
  }
}
