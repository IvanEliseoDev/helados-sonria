import { Module } from '@nestjs/common';

import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { EmployeesModule } from './employees/employees.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/config';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://cvcg11:t1j5NPukgKeDl73a@cluster0.fager59.mongodb.net/helados-sonrisa'), ConfigModule.forRoot({isGlobal: true, validate: validateEnv}) , EventsModule, SeedModule, CustomersModule, AuthModule, ProductsModule, EmployeesModule, MailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
