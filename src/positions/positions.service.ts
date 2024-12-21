import { PositionsRepository } from './repository/positions.repository';
import { CreatePositionDto, UpdatePositionDto } from './dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';
import { HandleRpcExceptions } from 'src/common/decorators';
import { PositionResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PositionsService {
  constructor(private readonly positionsRepository: PositionsRepository) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(PositionResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<PositionResponseDto[]> {
    const positions = await this.positionsRepository.findAll();

    return this.plainToInstanceDto(positions);
  }

  @HandleRpcExceptions()
  async findOne(positionId: string): Promise<PositionResponseDto> {
    const position = await this.positionsRepository.findOne(positionId);

    return this.plainToInstanceDto(position);
  }

  @HandleRpcExceptions()
  async findByIds(positionsIds: string[]): Promise<PositionResponseDto[]> {
    const positions = await this.positionsRepository.findByIds(positionsIds);

    return this.plainToInstanceDto(positions);
  }

  @HandleRpcExceptions()
  async save(request: CreatePositionDto): Promise<PositionResponseDto> {
    const newPosition = await this.positionsRepository.save(request);

    return this.plainToInstanceDto(newPosition);
  }

  @HandleRpcExceptions()
  async update(request: UpdatePositionDto): Promise<PositionResponseDto> {
    const updatedPosition = await this.positionsRepository.update(request);

    return this.plainToInstanceDto(updatedPosition);
  }

  @HandleRpcExceptions()
  async remove(positionId: string): Promise<DeleteResultResponse> {
    const deleteResult = await this.positionsRepository.remove(positionId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }
}
