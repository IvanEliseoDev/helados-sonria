import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, employeeSchema } from './entities/employee.entity';
import { MailModule } from 'src/mail/mail.module';
import { Customer, customerSchema } from 'src/customers/entities/customer.entity';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [MongooseModule.forFeature([
    {
      name: Employee.name,
      schema: employeeSchema
    },
    {
      name: Customer.name, // Registramos Customer para que se pueda inyectar en EmployeesService
      schema: customerSchema,
    },
  ]), MailModule],
  exports: [EmployeesService]
})
export class EmployeesModule { }
