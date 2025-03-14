import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Collaborators-MS');

  // Iniciar la comunicación con gRPC
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${envs.host}:${envs.port}`,
        package: [],
        protoPath: [],
        loader: {
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    },
  );

  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: envs.kafkaClientId,
          brokers: [envs.kafkaBroker],
        },
        consumer: {
          groupId: envs.kafkaGroupId,
          allowAutoTopicCreation: true,
        },
      },
    },
  );

  await grpcApp.listen();
  logger.log(
    `Collaborators Microservice running with gRPC on ${envs.host}:${envs.port}`,
  );

  await kafkaApp.listen();
  logger.log(`Collaborators Microservice connected to Kafka`);
}
bootstrap();
