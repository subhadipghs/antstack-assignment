import Joi from 'joi'
import {CATEGORY} from '../service/category.js'

export class InvoiceValidators {
  // validator for create invoice api
  static postInvoice = {
    // validation schema for request payload
    body: Joi.array()
      .items(
        Joi.object({
          item: Joi.string().trim().max(250).min(2).required(),
          itemCategory: Joi.string()
            .valid(
              CATEGORY.book,
              CATEGORY.cloth,
              CATEGORY.food,
              CATEGORY.medicine,
              CATEGORY.music,
              CATEGORY.imported
            )
            .trim()
            .required(),
          price: Joi.number().greater(0).required(),
          quantity: Joi.number().min(1).required(),
        })
      )
      .min(1)
      .required(),
  }
}
