import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');
  app.useLogger(logger);

  await app.listen(4000);
  logger.log(`Application running on: http://localhost:4000`);
}
bootstrap();
