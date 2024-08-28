import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.postgresDBHost,
      port: envs.postgresDBPort,
      username: envs.postgresDBUsername,
      password: envs.postgresDBPassword,
      database: envs.postgresDatabase,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: envs.postgresDBSynchronize,
    }),
  ],
})
export class PostgresDBModule {}
