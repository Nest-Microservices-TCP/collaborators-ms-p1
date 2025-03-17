import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkShiftsService } from './work-shifts.service';
import { WorkShiftsController } from './work-shifts.controller';
import { WorkShiftsRepository } from './repository/work-shifts.repository';

import { WorkShift } from './entity/work-shift.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkShift])],
  providers: [WorkShiftsRepository, WorkShiftsService],
  controllers: [WorkShiftsController],
})
export class WorkShiftsModule {}
