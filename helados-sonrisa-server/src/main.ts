import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //Limpio los otros properties que envie en la peticion y no lo haya defino en mi DTO 
      forbidNonWhitelisted: true, //Muestra cuales son las properties que no estan definidas
      transform:true,
      transformOptions: {
        enableImplicitConversion: true
      }
  }))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
