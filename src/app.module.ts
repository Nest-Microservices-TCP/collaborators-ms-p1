import { CollaboratorsModule } from './collaborators/collaborators.module';
import { WorkShiftsModule } from './work-shifts/work-shifts.module';
import { PostgresDBModule } from './database/postgresdb.module';
import { PositionsModule } from './positions/positions.module';
import { AreasModule } from './areas/areas.module';
import { Module } from '@nestjs/common';

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
