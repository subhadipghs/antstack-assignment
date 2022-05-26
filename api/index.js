import {Router} from 'express'
import {container} from '../container.js'
import {InvoiceValidators} from '../validator/invoice.js'
import {ValidationMiddleware} from '../middleware/validator.js'

const api = Router()
const invoiceController = container.cradle.invoiceController

api.post(
  '/invoice',
  ValidationMiddleware.createPayloadValidationMiddleware(
    InvoiceValidators.postInvoice.body
  ),
  invoiceController.postInvoice
)

export {api}
