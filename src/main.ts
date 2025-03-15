import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const openAPIconfig = new DocumentBuilder()
    .setTitle('API Teste')
    .setDescription('API de Teste')
    .setVersion('0.0')
    .addTag('teste')
    .addBearerAuth()
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, openAPIconfig);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
