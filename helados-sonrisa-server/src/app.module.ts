import * as dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { EmployeesModule } from './employees/employees.module';
import { EventsModule } from './events/events.module';
import { MailModule } from './mail/mail.module';
import { ProductsModule } from './products/products.module';
import { SeedModule } from './seed/seed.module';
import { validateEnv } from './config/config';

@Module({
  imports: [
    //* ConfigModule debe cargarse primero de manera global
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    //! MongooseModule configurado de forma asíncrona usando ConfigService
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.getOrThrow<string>('DATABASE_URL');
        return {
          uri,
        };
      },
    }),

    EventsModule,
    SeedModule,
    CustomersModule,
    AuthModule,
    ProductsModule,
    EmployeesModule,
    MailModule,
    AdminDashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
