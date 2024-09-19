import { Injectable } from '@nestjs/common';
import { CreateAreaDto, UpdateAreaDto } from './dto/request';
import { AreasRepository } from './repositories/areas.repository';
import { HandleRpcExceptions } from 'src/common/decorators';
import { plainToInstance } from 'class-transformer';
import { AreaResponseDto } from './dto/response/area-response.dto';

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
  async findOneById(id: string): Promise<AreaResponseDto> {
    const area = await this.areasRepository.findOneById(id);

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
  async deleteById(id: string): Promise<AreaResponseDto> {
    const area = await this.areasRepository.deleteById(id);

    return plainToInstance(AreaResponseDto, area, {
      excludeExtraneousValues: true,
    });
  }
}
