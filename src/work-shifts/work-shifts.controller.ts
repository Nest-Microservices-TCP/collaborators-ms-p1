import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  WorkShift,
  CreateWorkShiftRequest,
  FindWorkShiftsResponse,
  FindOneWorkShiftRequest,
  WorkShiftsServiceController,
  WorkShiftsServiceControllerMethods,
} from 'src/grpc/proto/collaborators/work_shifts.pb';

import { WorkShiftsService } from './work-shifts.service';

@Controller()
@WorkShiftsServiceControllerMethods()
export class WorkShiftsController implements WorkShiftsServiceController {
  constructor(private readonly workShiftsService: WorkShiftsService) {}

  save(request: CreateWorkShiftRequest): void {
    this.workShiftsService.save(request);
  }
  find():
    | Promise<FindWorkShiftsResponse>
    | Observable<FindWorkShiftsResponse>
    | FindWorkShiftsResponse {
    return this.workShiftsService.find();
  }
  findOne(
    request: FindOneWorkShiftRequest,
  ): Promise<WorkShift> | Observable<WorkShift> | WorkShift {
    return this.workShiftsService.findOne(request);
  }
}
