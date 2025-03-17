import { Injectable } from '@nestjs/common';

import { CreateWorkShiftRequest } from 'src/grpc/proto/collaborators/work_shifts.pb';

import { WorkShiftsRepository } from './repository/work-shifts.repository';

@Injectable()
export class WorkShiftsService {
  constructor(private readonly workShiftsRepository: WorkShiftsRepository) {}

  async save(request: CreateWorkShiftRequest): Promise<void> {
    this.workShiftsRepository.save(request);
  }
}
