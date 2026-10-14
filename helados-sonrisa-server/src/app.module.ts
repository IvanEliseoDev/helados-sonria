import * as dns from 'node:dns';
// Parche de DNS global para evitar errores ECONNREFUSED con MongoDB Atlas
if (process.env.NODE_ENV !== 'production') {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

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
        // Puedes cambiar esto por una variable de entorno en tu .env (ej. DATABASE_URL)
        const uri =
          configService.get<string>('DATABASE_URL') ||
          'mongodb+srv://cvcg11:t1j5NPukgKeDl73a@cluster0.fager59.mongodb.net/helados-sonrisa';
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
export class AppModule {}
