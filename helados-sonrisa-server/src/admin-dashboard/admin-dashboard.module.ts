import { Module } from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard.service';
import { AdminDashboardController } from './admin-dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer } from 'src/customers/entities/customer.entity';
import { Event } from 'src/events/entities/event.entity';

@Module({
  controllers: [AdminDashboardController],
  providers: [AdminDashboardService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: Customer,
      },
      {
        name: Event.name,
        schema: Event,
      },
    ]),
  ],
})
export class AdminDashboardModule {}
