import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import {
  HttpExceptionsFilter,
  TypeORMExceptionsFilter,
} from './common/exceptions/filters';

import { envs } from './config';

import { COLLABORATORS_AREAS_PACKAGE_NAME } from './grpc/collaborators/areas.pb';
import { COLLABORATORS_POSITIONS_PACKAGE_NAME } from './grpc/collaborators/positions.pb';
import { COLLABORATORS_COLLABORATORS_PACKAGE_NAME } from './grpc/collaborators/collaborators.pb';

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
          './proto-files/collaborators/areas.proto',
          './proto-files/collaborators/positions.proto',
          './proto-files/collaborators/collaborators.proto',
        ],
        loader: {
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    },
  );

  grpcApp.useGlobalFilters(
    new HttpExceptionsFilter(),
    new TypeORMExceptionsFilter(),
  );

  await grpcApp.listen();
  logger.log(
    `Collaborators Microservice running with gRPC on ${envs.host}:${envs.port}`,
  );
}
bootstrap();
