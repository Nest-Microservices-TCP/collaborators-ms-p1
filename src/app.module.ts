import { Module } from '@nestjs/common';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { AreasModule } from './areas/areas.module';
import { PostgresDBModule } from './database/postgresdb.module';
import { PositionsModule } from './positions/positions.module';
import { WorkShiftsModule } from './work-shifts/work-shifts.module';

@Module({
  imports: [
    PostgresDBModule,
    CollaboratorsModule,
    AreasModule,
    PositionsModule,
    WorkShiftsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
