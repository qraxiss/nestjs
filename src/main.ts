import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: envService.apiUrl,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .addServer(envService.apiUrl)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  await app.listen(envService.envConfig.APP_PORT);
}

bootstrap();