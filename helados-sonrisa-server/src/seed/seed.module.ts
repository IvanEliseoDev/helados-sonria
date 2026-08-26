import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CommonModule } from 'src/common/common.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [CommonModule, EventsModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
