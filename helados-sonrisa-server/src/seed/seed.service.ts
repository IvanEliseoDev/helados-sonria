import { Injectable } from '@nestjs/common';
import { EventsService } from 'src/events/events.service';
import { EVENT_DATA } from './data/events/data.events';

@Injectable()
export class SeedService {

  constructor(private readonly eventService: EventsService) {}

  async executeSeed() {
    await this.eventService.removeAll()
    await this.eventService.insertMany(EVENT_DATA)
    return "Semilla ejecutada exitosamente"
  }
}
