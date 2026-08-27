import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Post("/many")
  createMany(@Body() createCustomerDtos: CreateCustomerDto[]) {
    return this.customersService.insertMany(createCustomerDtos);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.customersService.findOne(term);
  }

  @Patch('/change-status/:term')
  changeStatus(@Param('term') term: string, ) {
    return this.customersService.toggleActiveStatus(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(term, updateCustomerDto);
  }

  @Delete(':term')
  remove(@Param('term') term: string) {
    return this.customersService.remove(term);
  }
}
