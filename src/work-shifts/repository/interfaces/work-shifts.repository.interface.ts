import { IRepository } from 'src/common/repository';
import { CreateWorkShiftDto } from 'src/work-shifts/dto/request';
import { WorkShift } from 'src/work-shifts/entity/work-shift.entity';

export interface IWorkShiftsRepository
  extends IRepository<WorkShift, CreateWorkShiftDto> {}
