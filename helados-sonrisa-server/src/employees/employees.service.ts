import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Employee } from './entities/employee.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponse } from 'src/utils/api.response';
import { handleDBException } from 'src/utils/handle-exceptions.util';

@Injectable()
export class EmployeesService {

  constructor(@InjectModel(Employee.name)
  private readonly employeeModel: Model<Employee>) { }

  create(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new employee';
  }

  async findAll() {
    const employees = await this.employeeModel.find()
    return new ApiResponse("Empleados obtenido exitosamente", 200, employees);
  }

  async findOne(term: string) {
    try {
      let employee: Employee | null = null
      if (isValidObjectId(term)) {
        employee = await this.employeeModel.findById(term)
      }
      if (!employee) {
        employee = await this.employeeModel.findOne({
          $or: [
            { firstName: { $regex: term, $options: 'i' } },
            { lastName: { $regex: term, $options: 'i' } },
            { email: { $regex: term, $options: 'i' } }
          ]
        }).select(['-loginAttempts -lockUntil'])
      }
      if (!employee) return new ApiResponse("No se encontro ningun empleado", 404, null)
      return new ApiResponse("Empleado obtenido exitosamente", 200, employee)
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, EmployeesService.name)
    }
  }

  async update(term: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const filter = isValidObjectId(term) ? { _id: term } : { email: term }
      const employeeUpdate = await this.employeeModel.findOneAndUpdate(filter, updateEmployeeDto, { new: true }).select('-password -loginAttempts -lockUntil')
      if (!employeeUpdate) return new ApiResponse("No se pudo actualizar al empleado, el empleado no exite", 404, null)
      return new ApiResponse("Empleado actualizado exitosamente", 200, employeeUpdate)
    } catch (error) {
      if (error instanceof NotFoundException) throw error
      handleDBException(error, EmployeesService.name)
    }
  }

  remove(term: string) {
    return `This action removes a #${id} employee`;
  }
}
