import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkShiftsService } from './work-shifts.service';
import { WorkShiftEntity } from './entity/work-shift.entity';
import { WorkShiftsController } from './work-shifts.controller';
import { WorkShiftsRepository } from './repository/work-shifts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WorkShiftEntity])],
  controllers: [WorkShiftsController],
  providers: [WorkShiftsRepository, WorkShiftsService],
})
export class WorkShiftsModule {}
