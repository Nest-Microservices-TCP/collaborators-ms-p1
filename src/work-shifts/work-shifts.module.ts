import { WorkShiftsRepository } from './repository/work-shifts.repository';
import { WorkShiftsController } from './work-shifts.controller';
import { WorkShiftsService } from './work-shifts.service';
import { WorkShift } from './entity/work-shift.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([WorkShift])],
  controllers: [WorkShiftsController],
  providers: [WorkShiftsRepository, WorkShiftsService],
})
export class WorkShiftsModule {}
