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
  async findAll(): Promise<WorkShiftResponseDto[]> {
    return this.workShiftsService.findAll();
  }

  @MessagePattern('collaborators.find.one.workShift')
  async findOne(
    @Payload('workShiftId') workShiftId: string,
  ): Promise<WorkShiftResponseDto> {
    return this.workShiftsService.findOne(workShiftId);
  }

  @MessagePattern('collaborators.save.workShift')
  async save(
    @Payload() request: CreateWorkShiftDto,
  ): Promise<WorkShiftResponseDto> {
    return this.workShiftsService.save(request);
  }

  @MessagePattern('collaborators.update.workShift')
  async update(
    @Payload() request: UpdateWorkShiftDto,
  ): Promise<WorkShiftResponseDto> {
    return this.workShiftsService.update(request);
  }

  @MessagePattern('collaborators.remove.workShift')
  async remove(
    @Payload('workShiftId') workShiftId: string,
  ): Promise<DeleteResultResponse> {
    return this.workShiftsService.remove(workShiftId);
  }

  @MessagePattern('collaborators.find.workShifts.by.ids')
  async findByIds(
    @Payload('workShiftsIds') workShiftsIds: string[],
  ): Promise<WorkShiftResponseDto[]> {
    return this.workShiftsService.findByIds(workShiftsIds);
  }
}
