import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.employeesService.findOne(term);
  }

  @Patch('/change-status/:term')
  changeStatus(@Param('term') term: string) {
    return this.employeesService.toggleActiveStatus(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(term, updateEmployeeDto);
  }

  @Delete(':term')
  remove(@Param('term') term: string) {
    return this.employeesService.remove(term);
  }
}
