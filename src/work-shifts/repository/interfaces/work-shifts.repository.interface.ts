import { WorkShift } from 'src/work-shifts/entity/work-shift.entity';
import { IBaseRepository } from 'src/common/interfaces';
import {
  CreateWorkShiftDto,
  UpdateWorkShiftDto,
} from 'src/work-shifts/dto/request';

export interface IWorkShiftsRepository
  extends IBaseRepository<WorkShift, CreateWorkShiftDto, UpdateWorkShiftDto> {}
