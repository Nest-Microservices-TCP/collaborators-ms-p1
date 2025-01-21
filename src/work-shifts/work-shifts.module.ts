import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkShift } from './entity/work-shift.entity';

import { WorkShiftsRepository } from './repository/work-shifts.repository';
import { WorkShiftsController } from './work-shifts.controller';
import { WorkShiftsService } from './work-shifts.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkShift])],
  controllers: [WorkShiftsController],
  providers: [WorkShiftsRepository, WorkShiftsService],
})
export class WorkShiftsModule {}
