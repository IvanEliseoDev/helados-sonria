import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CommonModule } from 'src/common/common.module';
import { EventsModule } from 'src/events/events.module';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [CommonModule, EventsModule, CustomersModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
