import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { swagger } from './common/doc/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  swagger(app, 'development');

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
