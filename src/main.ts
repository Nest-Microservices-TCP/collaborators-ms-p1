import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Collaborators-MS');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: envs.collaboratorsHostMS,
        port: envs.collaboratorsPortMS,
      },
    },
  );

  await app.listen();

  logger.log(`Collaborators Microservice listen on port ${envs.port}`);
}
bootstrap();
