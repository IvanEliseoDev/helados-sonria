import { Body, Controller, Get, Post, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.auth.dto';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@GetUser('userId') userId:{userId: string, email:string, role:string}){
    return this.authService.me(userId)
  }

  @Post("/login")
  async login(@Body() loginDto: loginDto, @Res({passthrough: true}) res:Response) {
    return this.authService.login(loginDto, res)
  }

  @Post("/logOut")
  async logOut(@Res({passthrough: true}) res:Response){
    return await this.authService.logout(res)
  }
}
