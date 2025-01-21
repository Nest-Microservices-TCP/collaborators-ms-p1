import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { HandleRpcExceptions } from 'src/common/decorators';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateWorkShiftDto, UpdateWorkShiftDto } from './dto/request';
import { WorkShiftResponseDto } from './dto/response';

import { WorkShiftsRepository } from './repository/work-shifts.repository';

@Injectable()
export class WorkShiftsService {
  constructor(private readonly workShiftsRepository: WorkShiftsRepository) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(WorkShiftResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<WorkShiftResponseDto[]> {
    const workShifts = await this.workShiftsRepository.findAll();

    return this.plainToInstanceDto(workShifts);
  }

  @HandleRpcExceptions()
  async findOne(workShiftId: string): Promise<WorkShiftResponseDto> {
    const workShift = await this.workShiftsRepository.findOne(workShiftId);

    return this.plainToInstanceDto(workShift);
  }

  @HandleRpcExceptions()
  async findByIds(workShiftsIds: string[]): Promise<WorkShiftResponseDto[]> {
    const workShifts = await this.workShiftsRepository.findByIds(workShiftsIds);

    return this.plainToInstanceDto(workShifts);
  }

  @HandleRpcExceptions()
  async save(request: CreateWorkShiftDto): Promise<WorkShiftResponseDto> {
    const newWorkShift = await this.workShiftsRepository.save(request);

    return this.plainToInstanceDto(newWorkShift);
  }

  @HandleRpcExceptions()
  async update(request: UpdateWorkShiftDto): Promise<WorkShiftResponseDto> {
    const { workShiftId, ...rest } = request;

    const updatedWorkShift = await this.workShiftsRepository.update(
      { workShiftId },
      rest,
    );

    return this.plainToInstanceDto(updatedWorkShift);
  }

  @HandleRpcExceptions()
  async remove(workShiftId: string): Promise<DeleteResultResponse> {
    const deleteResult = await this.workShiftsRepository.remove(workShiftId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }
}
