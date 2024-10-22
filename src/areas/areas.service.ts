import { Injectable } from '@nestjs/common';
import { AreaResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { HandleRpcExceptions } from 'src/common/decorators';
import { CreateAreaDto, UpdateAreaDto } from './dto/request';
import { AreasRepository } from './repository/areas.repository';

@Injectable()
export class AreasService {
  constructor(private readonly areasRepository: AreasRepository) {}

  @HandleRpcExceptions()
  async save(request: CreateAreaDto): Promise<AreaResponseDto> {
    const area = await this.areasRepository.save(request);

    return plainToInstance(AreaResponseDto, area, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<AreaResponseDto[]> {
    const areas = await this.areasRepository.findAll();

    return plainToInstance(AreaResponseDto, areas, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findOneById(areaId: string): Promise<AreaResponseDto> {
    const area = await this.areasRepository.findOneById(areaId);

    return plainToInstance(AreaResponseDto, area, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async update(request: UpdateAreaDto): Promise<AreaResponseDto> {
    const area = await this.areasRepository.update(request);

    return plainToInstance(AreaResponseDto, area, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async deleteById(areaId: string): Promise<AreaResponseDto> {
    const area = await this.areasRepository.deleteById(areaId);

    return plainToInstance(AreaResponseDto, area, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findByIds(areasIds: string[]): Promise<AreaResponseDto[]> {
    const areas = await this.areasRepository.findByIds(areasIds);

    return plainToInstance(AreaResponseDto, areas, {
      excludeExtraneousValues: true,
    });
  }
}
