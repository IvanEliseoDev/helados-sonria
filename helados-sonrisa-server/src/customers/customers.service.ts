import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Customer } from './entities/customer.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponse } from 'src/utils/api.response';
import * as bcrypt from 'bcrypt';
import { handleDBException } from 'src/utils/handle-exceptions.util';

@Injectable()
export class CustomersService {

  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const { password } = createCustomerDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newCustomer = await this.customerModel.create({
        ...createCustomerDto,
        password: hashedPassword,
        isActive: true
      });
      
      const customerObj = newCustomer.toObject();
      delete (customerObj as any).password;
      return new ApiResponse("Cliente creado exitosamente", 201, customerObj);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, CustomersService.name);
    }
  }

  async findAll() {
    try {
      const customers = await this.customerModel
        .find()
        .select('-password -loginAttempts -lockUntil');

      if (customers.length === 0) {
        throw new NotFoundException("No existen clientes registrados");
      }
      return new ApiResponse("Clientes obtenidos exitosamente", 200, customers);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, CustomersService.name);
    }
  }

  async findOne(term: string) {
    try {
      let customer: Customer | null = null;
      if (isValidObjectId(term)) {
        customer = await this.customerModel.findById(term).select('-password -loginAttempts -lockUntil');
      }
      if (!customer) {
        customer = await this.customerModel.findOne({
          $or: [
            { firstName: { $regex: term, $options: 'i' } },
            { lastName: { $regex: term, $options: 'i' } },
            { email: term.toLowerCase().trim() }
          ],
        }).select(" -loginAttempts -lockUntil");
      }
      if (!customer) {
        throw new NotFoundException(`No se encontró ningún cliente con el término: "${term}"`);
      }
      return new ApiResponse("Cliente encontrado", 200, customer);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, CustomersService.name);
    }
  }

  async update(term: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const { password, email, ...updateData } = updateCustomerDto;
      const filter = isValidObjectId(term) ? { _id: term } : { email: term.toLowerCase().trim() };
      const updatedCustomer = await this.customerModel
        .findOneAndUpdate(filter, updateData, { new: true })
        .select("-password -loginAttempts -lockUntil");

      if (!updatedCustomer) {
        throw new NotFoundException(`No se encontró ningún cliente con el término: "${term}"`);
      }
      return new ApiResponse("Cliente actualizado exitosamente", 200, updatedCustomer);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, CustomersService.name);
    }
  }

  //* Borrado Físico por término (MongoID o Email)
  async remove(term: string) {
    try {
      const filter = isValidObjectId(term) ? { _id: term } : { email: term.toLowerCase().trim() };
      const deletedCustomer = await this.customerModel.findOneAndDelete(filter);

      if (!deletedCustomer) {
        throw new NotFoundException(`No se encontró ningún cliente para eliminar con el término: "${term}"`);
      }

      return new ApiResponse(`Cliente eliminado físicamente con éxito`, 200, {
        id: deletedCustomer._id,
        email: deletedCustomer.email
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, CustomersService.name);
    }
  }

  //* Desactivación Lógica (Soft Delete / Toggle isActive)
  async toggleActiveStatus(term: string) {
    try {
      const filter = isValidObjectId(term) ? { _id: term } : { email: term.toLowerCase().trim() };
      
      const customer = await this.customerModel.findOne(filter);
      if (!customer) {
        throw new NotFoundException(`No se encontró el cliente con el término: "${term}"`);
      }

      // Invierte el estado actual del cliente (true -> false / false -> true)
      customer.isActive = !customer.isActive;
      await customer.save();

      const message = customer.isActive ? "Cliente activado exitosamente" : "Cliente desactivado exitosamente";
      return new ApiResponse(message, 200, { id: customer._id, isActive: customer.isActive });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, CustomersService.name);
    }
  }

  //* Inserción Masiva (Carga de datos / Seed data)
  async insertMany(createCustomerDtos: CreateCustomerDto[]) {
    try {
      // Mapeamos los elementos para encriptar todas las contraseñas en paralelo
      const customersToInsert = await Promise.all(
        createCustomerDtos.map(async (customer) => {
          const hashedPassword = await bcrypt.hash(customer.password, 10);
          return {
            ...customer,
            email: customer.email.toLowerCase().trim(),
            password: hashedPassword,
            isActive: true,
          };
        })
      );

      const insertedCustomers = await this.customerModel.insertMany(customersToInsert);

      return new ApiResponse(
        `${insertedCustomers.length} clientes fueron insertados exitosamente`,
        201,
        { count: insertedCustomers.length }
      );
    } catch (error) {
      handleDBException(error, CustomersService.name);
    }
  }

  //* Limpiar toda la colección (Ideal para reiniciar entornos de prueba o seeds)
  async removeAll() {
    try {
      const { deletedCount } = await this.customerModel.deleteMany({});
      return new ApiResponse("Todos los registros de clientes fueron eliminados", 200, { deletedCount });
    } catch (error) {
      handleDBException(error, CustomersService.name);
    }
  }
}