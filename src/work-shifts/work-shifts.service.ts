import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import {
  FindWorkShiftsResponse,
  CreateWorkShiftRequest,
  FindOneWorkShiftRequest,
  FindWorkShiftsByIdsRequest,
} from 'src/grpc/proto-files/collaborators/work_shifts.pb';

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

  @HandleRpcExceptions()
  async findByIds(
    request: FindWorkShiftsByIdsRequest,
  ): Promise<FindWorkShiftsResponse> {
    const { work_shifts_ids } = request;

    const work_shifts =
      await this.workShiftsRepository.findByIds(work_shifts_ids);

    return { work_shifts };
  }

  @HandleRpcExceptions()
  async find(): Promise<FindWorkShiftsResponse> {
    const work_shifts = await this.workShiftsRepository.find();

    return { work_shifts };
  }
}
