import { Module } from '@nestjs/common';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { AreasModule } from './areas/areas.module';
import { PostgresDBModule } from './database/postgresdb.module';
import { PositionsModule } from './positions/positions.module';

@Module({
  imports: [
    PostgresDBModule,
    CollaboratorsModule,
    AreasModule,
    PositionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
