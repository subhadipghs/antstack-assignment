import tap from 'tap'
import {InvoiceService} from '../service/invoice.js'
import {CategoryFactory} from '../service/category.js'

let categoryFactory, invoiceService

tap.beforeEach(() => {
  categoryFactory = new CategoryFactory()
  invoiceService = new InvoiceService({categoryFactory})
})

tap.test('should create the invoice of the purchased items', (t) => {
  const purchased = [
    {
      item: 'Headache pills',
      itemCategory: 'Medicine',
      quantity: 5,
      price: 50,
    },
    {
      item: 'Sandwich',
      itemCategory: 'Food',
      quantity: 2,
      price: 200,
    },
    {
      item: 'Perfume',
      itemCategory: 'Imported',
      quantity: 1,
      price: 4000,
    },
    {
      item: 'Black Swan',
      itemCategory: 'Book',
      quantity: 1,
      price: 300,
    },
  ]
  const sortedItems = ['Black Swan', 'Headache pills', 'Perfume', 'Sandwich']
  const invoice = invoiceService.createInvoice(purchased)

  t.ok(invoice)
  t.hasProp(invoice, 'timestamp', 'should have timestamp property')
  t.hasProp(invoice, 'items', 'should have items array property')
  t.hasProp(invoice, 'discount', 'should have discount amount property')
  t.hasProp(invoice, 'subTotal', 'should have subTotal property')
  t.hasProp(invoice, 'total', 'should have total property')
  t.hasProp(invoice, 'discountRate', 'should have discountRate property')

  invoice.items.forEach((item, index) => {
    t.hasProp(item, 'item', 'should have item name')
    t.hasProp(item, 'taxRate', 'should have applied tax rate')
    t.hasProp(item, 'subTotal', 'should have sub total amount')
    t.hasProp(item, 'taxAmount', 'should have tax amount')
    t.hasProp(item, 'totalAmount', 'should have total amount')
    t.equal(
      invoice.items[index].item,
      sortedItems[index],
      'items should be sorted by names'
    )
  })

  const expected = {
    subTotal: 5702.5,
    discountRate: 5,
    discount: 285.13,
    total: 5417.37,
  }

  t.equal(
    invoice.subTotal,
    expected.subTotal,
    `should be equal to sub total amount`
  )
  t.equal(
    invoice.discountRate,
    expected.discountRate,
    'should be equal to discountRate'
  )
  t.equal(
    invoice.discount,
    expected.discount,
    'should be equal to discount amount'
  )
  t.equal(invoice.total, expected.total, 'should be equal to total amount')

  t.end()
})

tap.test('should raise tax amount based on cloth item price', (t) => {
  const purchased = [
    {
      item: 'Pants',
      itemCategory: 'Clothes',
      quantity: 5,
      price: 500,
    },
    {
      item: 'T-shirts',
      itemCategory: 'Clothes',
      quantity: 2,
      price: 200,
    },
  ]
  const invoice = invoiceService.createInvoice(purchased)
  const [pants] = invoice.items.filter(
    (item) => item.item === purchased[0].item
  )
  const [tshirt] = invoice.items.filter(
    (item) => item.item === purchased[1].item
  )
  t.ok(pants)
  t.ok(tshirt)
  t.hasProp(pants, 'taxRate', 'pants should have taxRate property')
  t.equal(pants.taxRate, 12, 'pants should have tax rate 12%')
  t.hasProp(tshirt, 'taxRate', 'tshirt should have taxRate property')
  t.equal(tshirt.taxRate, 5, 'tshirt should have tax rate 12%')
  t.end()
})

tap.test(
  'should throw not found error if encounted invalid item category',
  (t) => {
    const purchased = [
      {
        item: 'Pants',
        itemCategory: 'Oops',
        quantity: 5,
        price: 100,
      },
    ]
    t.throws(() => invoiceService.createInvoice(purchased))
    t.end()
  }
)
