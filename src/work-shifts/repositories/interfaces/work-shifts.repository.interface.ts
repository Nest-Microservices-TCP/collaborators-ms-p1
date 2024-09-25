import { WorkShiftEntity } from 'src/work-shifts/entities/work-shift.entity';
import { IBaseRepository } from 'src/common/interfaces';
import {
  CreateWorkShiftDto,
  UpdateWorkShiftDto,
} from 'src/work-shifts/dto/request';

export interface IWorkShiftsRepository
  extends IBaseRepository<
    WorkShiftEntity,
    CreateWorkShiftDto,
    UpdateWorkShiftDto
  > {}
