import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { envs } from './config';

import { COLLABORATORS_AREAS_PACKAGE_NAME } from './grpc/proto/collaborators/areas.pb';
import { COLLABORATORS_POSITIONS_PACKAGE_NAME } from './grpc/proto/collaborators/positions.pb';
import { COLLABORATORS_COLLABORATORS_PACKAGE_NAME } from './grpc/proto/collaborators/collaborators.pb';

async function bootstrap() {
  const logger = new Logger('Collaborators-MS');

  // Iniciar la comunicación con gRPC
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${envs.host}:${envs.port}`,
        package: [
          COLLABORATORS_AREAS_PACKAGE_NAME,
          COLLABORATORS_POSITIONS_PACKAGE_NAME,
          COLLABORATORS_COLLABORATORS_PACKAGE_NAME,
        ],
        protoPath: [
          './proto/collaborators/areas.proto',
          './proto/collaborators/positions.proto',
          './proto/collaborators/collaborators.proto',
        ],
        loader: {
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    },
  );

  await grpcApp.listen();
  logger.log(
    `Collaborators Microservice running with gRPC on ${envs.host}:${envs.port}`,
  );
}
bootstrap();
