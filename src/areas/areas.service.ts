import { AreasRepository } from './repository/areas.repository';
import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateAreaDto, UpdateAreaDto } from './dto/request';
import { HandleRpcExceptions } from 'src/common/decorators';
import { plainToInstance } from 'class-transformer';
import { AreaResponseDto } from './dto/response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AreasService {
  constructor(private readonly areasRepository: AreasRepository) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(AreaResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<AreaResponseDto[]> {
    const areas = await this.areasRepository.findAll();

    return this.plainToInstanceDto(areas);
  }

  @HandleRpcExceptions()
  async findOne(areaId: string): Promise<AreaResponseDto> {
    const area = await this.areasRepository.findOne(areaId);

    return this.plainToInstanceDto(area);
  }

  @HandleRpcExceptions()
  async findByIds(areasIds: string[]): Promise<AreaResponseDto[]> {
    const areas = await this.areasRepository.findByIds(areasIds);

    return this.plainToInstanceDto(areas);
  }

  @HandleRpcExceptions()
  async save(request: CreateAreaDto): Promise<AreaResponseDto> {
    const newArea = await this.areasRepository.save(request);

    return this.plainToInstanceDto(newArea);
  }

  @HandleRpcExceptions()
  async update(request: UpdateAreaDto): Promise<AreaResponseDto> {
    const { areaId, ...rest } = request;

    const updatedArea = await this.areasRepository.update({ areaId }, rest);

    return this.plainToInstanceDto(updatedArea);
  }

  @HandleRpcExceptions()
  async remove(areaId: string): Promise<DeleteResultResponse> {
    const deleteResult = await this.areasRepository.remove(areaId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }
}
