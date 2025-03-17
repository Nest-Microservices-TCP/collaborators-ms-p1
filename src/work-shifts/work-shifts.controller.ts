import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';

import {
  WorkShift,
  CreateWorkShiftRequest,
  FindWorkShiftsResponse,
  FindOneWorkShiftRequest,
  WorkShiftsServiceController,
  WorkShiftsServiceControllerMethods,
} from 'src/grpc/proto/collaborators/work_shifts.pb';
import { Empty } from 'src/grpc/google/protobuf/empty.pb';

import { WorkShiftsService } from './work-shifts.service';

@Controller()
@WorkShiftsServiceControllerMethods()
export class WorkShiftsController implements WorkShiftsServiceController {
  constructor(private readonly workShiftsService: WorkShiftsService) {}

  save(request: CreateWorkShiftRequest): void {
    this.workShiftsService.save(request);
  }
  find(
    request: Empty,
    metadata?: Metadata,
  ):
    | Promise<FindWorkShiftsResponse>
    | Observable<FindWorkShiftsResponse>
    | FindWorkShiftsResponse {
    throw new Error('Method not implemented.');
  }
  findOne(
    request: FindOneWorkShiftRequest,
  ): Promise<WorkShift> | Observable<WorkShift> | WorkShift {
    return this.workShiftsService.findOne(request);
  }
}
