import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
=======
  app.enableCors();
<<<<<<< HEAD
>>>>>>> frank-nest
=======
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
>>>>>>> frank-nest
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
