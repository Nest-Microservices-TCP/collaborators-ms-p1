import { IRepository } from 'src/common/repository';
import {
  CreateWorkShiftRequest,
  FindOneWorkShiftRequest,
} from 'src/grpc/proto-files/collaborators/work_shifts.pb';
import { WorkShift } from 'src/work-shifts/entity/work-shift.entity';

export interface IWorkShiftsRepository
  extends IRepository<
    WorkShift,
    CreateWorkShiftRequest,
    FindOneWorkShiftRequest
  > {}
