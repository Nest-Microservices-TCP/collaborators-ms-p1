import { Module } from '@nestjs/common';

import { AreasModule } from './areas/areas.module';
import { PositionsModule } from './positions/positions.module';
import { PostgresDBModule } from './database/postgresdb.module';
import { WorkShiftsModule } from './work-shifts/work-shifts.module';
import { CollaboratorsModule } from './collaborators/collaborators.module';

@Module({
  imports: [
    PostgresDBModule,
    CollaboratorsModule,
    WorkShiftsModule,
    PositionsModule,
    AreasModule,
  ],
})
export class AppModule {}
