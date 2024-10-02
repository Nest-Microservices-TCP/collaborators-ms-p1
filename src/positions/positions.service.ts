import { PositionsRepository } from './repository/positions.repository';
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
  async save(request: CreatePositionDto): Promise<PositionResponseDto> {
    const position = await this.positionsRepository.save(request);

    return plainToInstance(PositionResponseDto, position, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async update(request: UpdatePositionDto): Promise<PositionResponseDto> {
    const position = await this.positionsRepository.update(request);

    return plainToInstance(PositionResponseDto, position, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async deleteById(id: string): Promise<PositionResponseDto> {
    const position = await this.positionsRepository.deleteById(id);

    return plainToInstance(PositionResponseDto, position, {
      excludeExtraneousValues: true,
    });
  }
}
