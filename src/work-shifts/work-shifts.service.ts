import { plainToInstance } from 'class-transformer';
import { WorkShiftResponseDto } from './dto/response';
import { WorkShiftsRepository } from './repository/work-shifts.repository';
import { HandleRpcExceptions } from 'src/common/decorators';
import { Injectable } from '@nestjs/common';
import { CreateWorkShiftDto, UpdateWorkShiftDto } from './dto/request';

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
  async deleteById(workShiftId: string): Promise<WorkShiftResponseDto> {
    const workShift = await this.workShiftsRepository.deleteById(workShiftId);

    return plainToInstance(WorkShiftResponseDto, workShift, {
      excludeExtraneousValues: true,
    });
  }
}
