import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [
    JwtModule.register({
      secret: "helados_sonrisa_secret_key_0110101",
      signOptions: {expiresIn: '25d'} //? El token expira en 25 dias
    }),
    CustomersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
