import { Controller } from '@nestjs/common';
import { WorkShiftResponseDto } from './dto/response';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WorkShiftsService } from './work-shifts.service';
import { CreateWorkShiftDto, UpdateWorkShiftDto } from './dto/request';

@Controller()
export class WorkShiftsController {
  constructor(private readonly workShiftsService: WorkShiftsService) {}

  @MessagePattern({ cmd: 'find.all.work.shifts' })
  findAll(): Promise<WorkShiftResponseDto[]> {
    return this.workShiftsService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.work.shift.by.id' })
  findOneById(
    @Payload('workShiftId') workShiftId: string,
  ): Promise<WorkShiftResponseDto> {
    return this.workShiftsService.findOneById(workShiftId);
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
  ): Promise<WorkShiftResponseDto> {
    return this.workShiftsService.remove(workShiftId);
  }

  @MessagePattern({ cmd: 'find.work.shifts.by.ids' })
  findByIds(
    @Payload() workShiftsIds: string[],
  ): Promise<WorkShiftResponseDto[]> {
    return this.workShiftsService.findByIds(workShiftsIds);
  }
}
