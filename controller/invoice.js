export class InvoiceController {
  constructor({invoiceService}) {
    this.invoiceService = invoiceService
  }

  /**
   * POST /v1/invoice
   */
  postInvoice = (request, response) => {
    try {
      const result = this.invoiceService.createInvoice(request.body)
      return response.status(201).json({
        success: true,
        result,
      })
    } catch (e) {
      return next(e)
    }
  }
}
