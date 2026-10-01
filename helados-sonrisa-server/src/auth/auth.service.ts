import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/customers.service';
import { loginDto } from './dto/login.auth.dto';
import { ApiResponse } from 'src/utils/api.response';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { handleDBException } from 'src/utils/handle-exceptions.util';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly customerService: CustomersService,
    private readonly employeeService: EmployeesService
  ) { }

  async login(loginDto: loginDto, res: Response) {
    try {
      const { email, password } = loginDto;
      let user: any = null;
      let role: 'CLIENTE' | 'EMPLEADO' = 'CLIENTE';
      //? Buscar primero como Cliente
      const customer = await this.customerService.findByEmailForAuth(email);
      if (customer) {
        user = customer;
        role = 'CLIENTE';
      } else {
        //* Si no es cliente, buscar como Empleado
        const employee = await this.employeeService.findByEmailForAuth(email);
        if (employee) {
          user = employee;
          role = 'EMPLEADO';
        }
      }
      //? Si no existe en ninguna de las dos colecciones
      if (!user) {
        return res
          .status(401)
          .json(new ApiResponse('Usuario no encontrado', 401, null));
      }
      //! Validar contraseña (usando la del usuario encontrado)
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res
          .status(401)
          .json(
            new ApiResponse(
              'Contraseña incorrecta, inténtalo de nuevo',
              401,
              null,
            ),
          );
      }
      const userObj = user.toObject ? user.toObject() : { ...user };
      delete userObj.password;
      //! Generar y firmar JWT
      const payload = {
        id: userObj._id,
        email: userObj.email,
        role: role,
      };
      const token = this.jwtService.sign(payload);
      //! Configurar la Cookie en la respuesta Express
      res.cookie('access_cookie', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true, // Obligatorio cuando sameSite es 'none'
        maxAge: 25 * 24 * 60 * 60 * 1000, // 25 días
      });
      return res.status(200).json(
        new ApiResponse('Inicio de sesión exitoso', 200, {
          user,
          role,
        }),
      );
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, AuthService.name);
    }
  }
  async me(userPayload: { id: string; email: string; role: string }) {
    try {
      let user: any = null;

      // 1. Validar según el rol guardado en el Payload del Token
      if (userPayload.role === 'CLIENTE') {
        user = await this.customerService.findByEmailForMe(userPayload.email);
      } else if (userPayload.role === 'EMPLEADO') {
        user = await this.employeeService.findByEmailForMe(userPayload.email);
      } else {
        user = await this.customerService.findByEmailForMe(userPayload.email);
        if (!user) {
          user = await this.employeeService.findByEmailForMe(userPayload.email);
        }
      }

      const userData = user?.data || user;
      if (!userData) {
        throw new NotFoundException('Usuario no encontrado');
      }

      // Retornamos un objeto plano limpio, sin referencias circulares
      return new ApiResponse("Perfil obtenido exitosamente", 200, {
        user: userData,
        role: userPayload.role,
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, AuthService.name);
    }
  }

  async logout(res: Response) {
    try {
      // Para borrar la cookie, debemos pasar exactamente la misma clave y opciones
      res.clearCookie('access_cookie', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });

      return new ApiResponse("Sesión cerrada exitosamente", 200, null);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, AuthService.name);
    }
  }


}
