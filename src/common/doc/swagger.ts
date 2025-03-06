import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swagger(app: INestApplication, environment: string) {
  if (environment !== 'development') return;

  const docOptions = new DocumentBuilder()
    .setTitle('Arena Tickets API')
    .setDescription('API para ingressos de Futebol')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, docOptions);

  SwaggerModule.setup('swagger', app, document);
}
