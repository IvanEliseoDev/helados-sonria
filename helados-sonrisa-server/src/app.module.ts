import { Module } from '@nestjs/common';

import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/helados-sonrisa'), EventsModule, SeedModule, CustomersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
