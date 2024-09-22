import { PositionsRepository } from './repositories/positions.repository';
import { PositionEntity } from './entities/position.entity';
import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';
import { CreatePositionDto, UpdatePositionDto } from './dto/request';
import { PositionResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PositionsService {
  constructor(private readonly positionsRepository: PositionsRepository) {}

  @HandleRpcExceptions()
  async findAll(): Promise<PositionResponseDto[]> {
    const positions = await this.positionsRepository.findAll();

    return plainToInstance(PositionResponseDto, positions, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findOneById(id: string): Promise<PositionResponseDto> {
    const position = await this.positionsRepository.findOneById(id);

    return plainToInstance(PositionResponseDto, position, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  save(request: CreatePositionDto): Promise<PositionEntity> {
    return this.positionsRepository.save(request);
  }

  @HandleRpcExceptions()
  update(request: UpdatePositionDto): Promise<PositionEntity> {
    return this.positionsRepository.update(request);
  }

  @HandleRpcExceptions()
  deleteById(id: string): Promise<PositionEntity> {
    return this.positionsRepository.deleteById(id);
  }
}
