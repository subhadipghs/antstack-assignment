export class InvoiceService {
  constructor({categoryFactory}) {
    this.categoryFactory = categoryFactory
  }

  /**
   * Create an invoice based on the purchased items
   *
   * @param {Object[]} purchasedItems - list of the items
   * @returns {Object} items with the price and tax and total payable amount
   */
  createInvoice(purchasedItems = []) {
    const currentDateTime = new Date().toISOString()
    // generate the invoice
    const invoice = purchasedItems
      .map((item) => {
        const subTotal = this.calculateItemPrice(item.quantity, item.price)
        const taxRate = this.getTaxRate(item.itemCategory, subTotal)
        const taxAmount = this.calculateTaxAmount(subTotal, taxRate)
        const totalAmount = this.calculateTotalAmount(subTotal, taxAmount)
        return {
          item: item.item,
          taxRate,
          subTotal,
          taxAmount,
          totalAmount,
        }
      })
      .reduce(
        (result, item) => {
          result.timestamp = currentDateTime
          result.items.push(item)
          result.subTotal += item.totalAmount
          // there is an additional 5% discount if the total amount exceeds 2000 INR
          if (result.subTotal >= 2000) {
            result.discountRate = 5
          }
          return result
        },
        {
          timestamp: null,
          items: [],
          subTotal: 0,
          discountRate: 0,
          discount: 0,
          total: 0,
        }
      )
    // calculate the discount if applicable
    if (invoice.discountRate > 0) {
      const discount = (invoice.subTotal * invoice.discountRate) / 100
      invoice.discount = parseFloat(discount.toFixed(2))
    }
    // calculate the total payable amount
    invoice.total = parseFloat((invoice.subTotal - invoice.discount).toFixed(2))
    // items should be sorted in ascending order of name
    invoice.items.sort((a, b) => {
      if (a.item > b.item) {
        return 1
      }
      if (a.item < b.item) {
        return -1
      }
      return 0
    })
    return invoice
  }

  /**
   * Return the total price for buying the item
   */
  calculateItemPrice(quantity, price) {
    return quantity * price
  }

  /**
   * Returns the tax amount based on tax rate
   */
  calculateTaxAmount(subTotal, taxRate) {
    return (subTotal * taxRate) / 100
  }

  /**
   * Return the total amount from sub total price and tax price
   */
  calculateTotalAmount(amount, taxPrice) {
    const totalAmount = amount + parseFloat(taxPrice.toFixed(2))
    return totalAmount
  }

  /**
   * Get tax rate based on item category
   */
  getTaxRate(itemCategory, price) {
    const tax = this.categoryFactory.make(itemCategory).getTax(price)
    return tax
  }
}
