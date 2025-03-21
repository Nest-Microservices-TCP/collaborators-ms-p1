import { Module } from '@nestjs/common';

import { AreasModule } from './areas/areas.module';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { PostgresDBModule } from './database/postgresdb.module';
import { PositionsModule } from './positions/positions.module';
import { WorkShiftsModule } from './work-shifts/work-shifts.module';

@Module({
  imports: [
    CollaboratorsModule,
    PostgresDBModule,
    WorkShiftsModule,
    PositionsModule,
    AreasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
