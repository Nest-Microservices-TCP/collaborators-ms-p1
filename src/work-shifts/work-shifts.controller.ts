import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateWorkShiftDto, UpdateWorkShiftDto } from './dto/request';
import { WorkShiftResponseDto } from './dto/response';

import { WorkShiftsService } from './work-shifts.service';

@Controller()
export class WorkShiftsController {
  constructor(private readonly workShiftsService: WorkShiftsService) {}

  @MessagePattern('collaborators.find.all.workShifts')
  findAll(): Promise<WorkShiftResponseDto[]> {
    return this.workShiftsService.findAll();
  }

  @MessagePattern('collaborators.find.one.workShift')
  findOne(
    @Payload('workShiftId') workShiftId: string,
  ): Promise<WorkShiftResponseDto> {
    return this.workShiftsService.findOne(workShiftId);
  }

  @MessagePattern('collaborators.save.workShift')
  save(@Payload() request: CreateWorkShiftDto): Promise<WorkShiftResponseDto> {
    return this.workShiftsService.save(request);
  }

  @MessagePattern({ cmd: 'update.work.shift' })
  update(
    @Payload() request: UpdateWorkShiftDto,
  ): Promise<WorkShiftResponseDto> {
    return this.workShiftsService.update(request);
  }

  @MessagePattern({ cmd: 'remove.work.shift.by.id' })
  remove(
    @Payload('workShiftId') workShiftId: string,
  ): Promise<DeleteResultResponse> {
    return this.workShiftsService.remove(workShiftId);
  }

  @MessagePattern({ cmd: 'find.work.shifts.by.ids' })
  findByIds(
    @Payload('workShiftsIds') workShiftsIds: string[],
  ): Promise<WorkShiftResponseDto[]> {
    return this.workShiftsService.findByIds(workShiftsIds);
  }
}
