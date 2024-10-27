
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet'
import {ALLOWED_ORIGINS} from '@constant'


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.use(helmet())
  app.enableCors({
    origin: ALLOWED_ORIGINS
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();