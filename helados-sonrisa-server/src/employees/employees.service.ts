import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Employee } from './entities/employee.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponse } from 'src/utils/api.response';
import { handleDBException } from 'src/utils/handle-exceptions.util';
import * as bcrypt from 'bcrypt';
import { Customer } from 'src/customers/entities/customer.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class EmployeesService {

  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
    private readonly mailService: MailService,
  ) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const { password, email, firstName } = createEmployeeDto;
      const isExistEmail = await this.customerModel.findOne({ email });
      if (isExistEmail) return new ApiResponse("Este correo ya esta ocupado", 400, null);
      
      const existEmployee = await this.employeeModel.findOne({ email });
      if (existEmployee) return new ApiResponse("Este correo ya esta ocupado", 400, null);
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const newEmployee = await this.employeeModel.create({
        ...createEmployeeDto,
        password: hashedPassword,
        email: email,
        isActive: true
      });
      
      const employeeObj = newEmployee.toObject();
      delete (employeeObj as any).password;
      
      //*. Disparar el envío de correo (No usamos 'await' si no queremos que la latencia del correo bloquee la respuesta HTTP)
      this.mailService.registerNewEmployeeMail(email, firstName, password);
      return new ApiResponse("Empleado creado exitosamente", 201, employeeObj);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, EmployeesService.name);
    }
  }

  async findAll() {
    const employees = await this.employeeModel.find().select('-password -loginAttempts -lockUntil');
    return new ApiResponse("Empleados obtenido exitosamente", 200, employees);
  }

  async findOne(term: string) {
    try {
      let employee: Employee | null = null;
      if (isValidObjectId(term)) {
        employee = await this.employeeModel.findById(term).select('-password -loginAttempts -lockUntil');
      }
      if (!employee) {
        employee = await this.employeeModel.findOne({
          $or: [
            { firstName: { $regex: term, $options: 'i' } },
            { lastName: { $regex: term, $options: 'i' } },
            { email: { $regex: term, $options: 'i' } }
          ]
        }).select('-password -loginAttempts -lockUntil');
      }
      if (!employee) return new ApiResponse("No se encontro ningun empleado", 404, null);
      return new ApiResponse("Empleado obtenido exitosamente", 200, employee);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, EmployeesService.name);
    }
  }

  async update(term: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const employeeData = { ...updateEmployeeDto };
      if (employeeData.password) {
        employeeData.password = await bcrypt.hash(employeeData.password, 10);
      }
      const filter = isValidObjectId(term) ? { _id: term } : { email: term };
      const employeeUpdate = await this.employeeModel.findOneAndUpdate(filter, employeeData, { new: true }).select('-password -loginAttempts -lockUntil');
      if (!employeeUpdate) return new ApiResponse("No se pudo actualizar al empleado, el empleado no exite", 404, null);
      return new ApiResponse("Empleado actualizado exitosamente", 200, employeeUpdate);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, EmployeesService.name);
    }
  }

  async toggleActiveStatus(term: string) {
    try {
      const filter = isValidObjectId(term) ? { _id: term } : { email: term.toLowerCase().trim() };
      const employee = await this.employeeModel.findOne(filter);
      if (!employee) return new ApiResponse("No se encontró ningún empleado", 404, null);
      employee.isActive = !employee.isActive;
      await employee.save();
      const message = employee.isActive ? "Empleado activado exitosamente" : "Empleado desactivado exitosamente";
      return new ApiResponse(message, 200, { id: employee._id, isActive: employee.isActive });
    } catch (error) {
      handleDBException(error, EmployeesService.name);
    }
  }

  async remove(term: string) {
    try {
      const filter = isValidObjectId(term) ? { _id: term } : { email: term.toLowerCase().trim() };
      const deletedEmployee = await this.employeeModel.findOneAndDelete(filter).select('-password -loginAttempts -lockUntil');
      if (!deletedEmployee) return new ApiResponse("No se encontró ningún empleado para eliminar", 404, null);
      return new ApiResponse("Empleado eliminado exitosamente", 200, { id: deletedEmployee._id, email: deletedEmployee.email });
    } catch (error) {
      handleDBException(error, EmployeesService.name);
    }
  }

  //*Metodo exclusivo para el login
  async findByEmailForAuth(email: string) {
    try {
      return await this.employeeModel
        .findOne({ email: email.toLowerCase().trim() })
        .select('+password'); // Asegura incluir el password para la validación
    } catch (error) {
      handleDBException(error, EmployeesService.name);
    }
  }

  //*Metodo exclusivo para me
  async findByEmailForMe(email: string) {
    try {
      return await this.employeeModel
        .findOne({ email: email.toLowerCase().trim() })
        .select('-password');
    } catch (error) {
      handleDBException(error, EmployeesService.name);
    }
  }
}