import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, customerSchema } from './entities/customer.entity';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [MongooseModule.forFeature([
    {
      name: Customer.name,
      schema: customerSchema
    }
  ])],
  exports:[CustomersService]
})
export class CustomersModule { }
