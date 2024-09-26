import { plainToInstance } from 'class-transformer';
import { WorkShiftResponseDto } from './dto/response';
import { WorkShiftsRepository } from './repositories/work-shifts.repository';
import { HandleRpcExceptions } from 'src/common/decorators';
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
  async findOneById(id: string): Promise<WorkShiftResponseDto> {
    const workShift = await this.workShiftsRepository.findOneById(id);

    return plainToInstance(WorkShiftResponseDto, workShift, {
      excludeExtraneousValues: true,
    });
  }
}
