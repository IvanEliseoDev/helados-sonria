import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/customers.service';
import { loginDto } from './dto/login.auth.dto';
import { ApiResponse } from 'src/utils/api.response';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { handleDBException } from 'src/utils/handle-exceptions.util';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly customerService: CustomersService
  ) { }

  async login(loginDto: loginDto, res: Response) {
    try {
      const { email, password } = loginDto
      const customer = await this.customerService.findOne(email)
      if (!customer || !customer.data) return new ApiResponse("Usuario no encontrado", 401, null)
      const isValid = await bcrypt.compare(password, customer.data.password)
      if (!isValid) return new ApiResponse("Contraseña incorrecta, intentalo de nuevo", 401, null)
      const payload = {
        id: customer.data._id,
        email: customer.data.email,
        role: "CLIENTE"
      }
      const token = this.jwtService.sign(payload)

      res.cookie('access_cookie', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 25 * 24 * 60 * 60 * 1000,
      })

      return new ApiResponse("Inicio de sesion exitoso", 200, customer)
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, CustomersService.name);
    }
  }

  async me(userId: { userId: string, email: string, role: string }) {
    try {
      console.log({ userId })
      const user = await this.customerService.findOne(userId.email)
      if (!user || !user.data) return new ApiResponse("Usuario no encantrado", 404, null)
      return new ApiResponse("Perfil obtenido exitosamente", 200, user)
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, CustomersService.name);
    }
  }

  async logout(res: Response) {
    try {
      // Para borrar la cookie, debemos pasar exactamente la misma clave y opciones
      res.clearCookie('access_cookie', {
        httpOnly: true,
        sameSite: 'lax',
      });

      return new ApiResponse("Sesión cerrada exitosamente", 200, null);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, AuthService.name);
    }
  }


}
