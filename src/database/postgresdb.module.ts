import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.dbHost,
      port: envs.dbPort,
      username: envs.dbUsername,
      password: envs.dbPassword,
      database: envs.dbName,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: envs.dbSynchronize,
    }),
  ],
})
export class PostgresDBModule {}
