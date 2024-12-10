import { CreateWorkShiftDto, UpdateWorkShiftDto } from './dto/request';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeleteResultResponse } from 'src/common/dto/response';
import { WorkShiftsService } from './work-shifts.service';
import { WorkShiftResponseDto } from './dto/response';
import { Controller } from '@nestjs/common';

@Controller()
export class WorkShiftsController {
  constructor(private readonly workShiftsService: WorkShiftsService) {}

  @MessagePattern({ cmd: 'find.all.work.shifts' })
  findAll(): Promise<WorkShiftResponseDto[]> {
    return this.workShiftsService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.work.shift' })
  findOne(
    @Payload('workShiftId') workShiftId: string,
  ): Promise<WorkShiftResponseDto> {
    return this.workShiftsService.findOne(workShiftId);
  }

  @MessagePattern({ cmd: 'save.work.shift' })
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
