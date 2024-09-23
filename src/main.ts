import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UniqueConstraintExceptionFilter } from './common/filters/unique-constraint-conflict-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new UniqueConstraintExceptionFilter(), new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Food Delivery')
    .setDescription('The food delivery API application')
    .setVersion('0.1')
    .addBearerAuth()
    .addTag('user')
    .addTag('product')
    .addTag('order')
    .addTag('customer')
    .addTag('restaurant')
    .addTag('order-item')
    .addTag('payment')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
