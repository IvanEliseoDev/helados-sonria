import { Injectable } from '@nestjs/common';
import { EventsService } from 'src/events/events.service';
import { EVENT_DATA } from './data/events/data.events';
import { CustomersService } from 'src/customers/customers.service';
import { DATA_CUSTOMERS } from './data/customers/data.customers';

@Injectable()
export class SeedService {

  constructor(private readonly eventService: EventsService, private readonly customersService:CustomersService) {}

  async executeSeed() {
    await this.seedEvent()
    await this.seedCustomers()
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

}
