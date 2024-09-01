import { Module } from '@nestjs/common';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { AreasModule } from './areas/areas.module';
import { PostgresDBModule } from './database/postgresdb.module';

@Module({
  imports: [PostgresDBModule, CollaboratorsModule, AreasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
