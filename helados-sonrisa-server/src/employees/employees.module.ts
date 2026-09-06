import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {  employeeSchema } from './entities/employee.entity';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [MongooseModule.forFeature([
    {
      name: EmployeesService.name,
      schema: employeeSchema
    }
  ])],
  exports:[EmployeesService]
})
export class EmployeesModule { }
