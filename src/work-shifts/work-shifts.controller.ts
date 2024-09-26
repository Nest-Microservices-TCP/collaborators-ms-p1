import { Controller } from '@nestjs/common';
import { WorkShiftResponseDto } from './dto/response';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WorkShiftsService } from './work-shifts.service';

@Controller()
export class WorkShiftsController {
  constructor(private readonly workShiftsService: WorkShiftsService) {}

  @MessagePattern({ cmd: 'find.all.work.shifts' })
  findAll(): Promise<WorkShiftResponseDto[]> {
    return this.workShiftsService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.work.shift.by.id' })
  findOneById(@Payload('id') id: string): Promise<WorkShiftResponseDto> {
    return this.workShiftsService.findOneById(id);
  }
}
