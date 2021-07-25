import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const host = configService.get<string>('host');
  const prefix = configService.get<string>('prefix');

  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  console.log(`Starting HTTP server on ${host}:${port} ...`);

  await app.listen(port);

  console.log('Started HTTP server.');
}

bootstrap();
