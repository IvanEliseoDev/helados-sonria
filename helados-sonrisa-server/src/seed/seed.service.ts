import { Injectable } from '@nestjs/common';
import { EventsService } from 'src/events/events.service';
import { EVENT_DATA } from './data/events/data.events';
import { CustomersService } from 'src/customers/customers.service';
import { DATA_CUSTOMERS } from './data/customers/data.customers';
import { ProductsService } from '../products/products.service';
import { PRODUCTS_DATA } from './data/products/products.data';

@Injectable()
export class SeedService {

  constructor(private readonly eventService: EventsService, private readonly customersService:CustomersService, private readonly productsService:ProductsService) {}

  async executeSeed() {
    await this.seedEvent()
    await this.seedCustomers()
    await this.seedProducts()
    return "Semilla ejecutada exitosamente"
  }

  async seedEvent() {
    await this.eventService.removeAll()
    await this.eventService.insertMany(EVENT_DATA)
  }

  async seedCustomers() {
    await this.customersService.removeAll()
    await this.customersService.insertMany(DATA_CUSTOMERS)
  }

  async seedProducts() {
    await this.productsService.removeAll()
    await this.productsService.insertMany(PRODUCTS_DATA)
  }

}
