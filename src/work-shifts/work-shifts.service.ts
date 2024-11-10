import { WorkShiftsRepository } from './repository/work-shifts.repository';
import { CreateWorkShiftDto, UpdateWorkShiftDto } from './dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';
import { HandleRpcExceptions } from 'src/common/decorators';
import { WorkShiftResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkShiftsService {
  constructor(private readonly workShiftsRepository: WorkShiftsRepository) {}

  @HandleRpcExceptions()
  async findAll(): Promise<WorkShiftResponseDto[]> {
    const workShifts = await this.workShiftsRepository.findAll();

    return plainToInstance(WorkShiftResponseDto, workShifts, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findOneById(workShiftId: string): Promise<WorkShiftResponseDto> {
    const workShift = await this.workShiftsRepository.findOneById(workShiftId);

    return plainToInstance(WorkShiftResponseDto, workShift, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async save(request: CreateWorkShiftDto): Promise<WorkShiftResponseDto> {
    const workShift = await this.workShiftsRepository.save(request);

    return plainToInstance(WorkShiftResponseDto, workShift, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async update(request: UpdateWorkShiftDto): Promise<WorkShiftResponseDto> {
    const workShift = await this.workShiftsRepository.update(request);

    return plainToInstance(WorkShiftResponseDto, workShift, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async remove(workShiftId: string): Promise<DeleteResultResponse> {
    const deleteResult = await this.workShiftsRepository.remove(workShiftId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findByIds(workShiftsIds: string[]): Promise<WorkShiftResponseDto[]> {
    const workShifts = await this.workShiftsRepository.findByIds(workShiftsIds);

    return plainToInstance(WorkShiftResponseDto, workShifts, {
      excludeExtraneousValues: true,
    });
  }
}
