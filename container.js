import {asClass, createContainer, InjectionMode, Lifetime} from 'awilix'
import {InvoiceService} from './service/invoice.js'
import {CategoryFactory} from './service/category.js'
import {InvoiceController} from './controller/invoice.js'

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
})

container.register({
  categoryFactory: asClass(CategoryFactory),
  invoiceService: asClass(InvoiceService).setLifetime(Lifetime.SINGLETON),
  invoiceController: asClass(InvoiceController),
})

export {container}
