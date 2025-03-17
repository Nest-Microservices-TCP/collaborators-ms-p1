import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import {
  CreateWorkShiftRequest,
  FindOneWorkShiftRequest,
} from 'src/grpc/proto/collaborators/work_shifts.pb';

import { WorkShiftsRepository } from './repository/work-shifts.repository';

import { WorkShift } from './entity/work-shift.entity';

@Injectable()
export class WorkShiftsService {
  constructor(private readonly workShiftsRepository: WorkShiftsRepository) {}

  @HandleRpcExceptions()
  async save(request: CreateWorkShiftRequest): Promise<void> {
    this.workShiftsRepository.save(request);
  }

  @HandleRpcExceptions()
  async findOne(request: FindOneWorkShiftRequest): Promise<WorkShift> {
    return this.workShiftsRepository.findOne(request);
  }
}
