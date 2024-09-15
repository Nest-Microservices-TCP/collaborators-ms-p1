import { Injectable } from '@nestjs/common';
import { AreaEntity } from './entities/area.entity';
import { CreateAreaDto, UpdateAreaDto } from './dto/request';
import { AreasRepository } from './repositories/areas.repository';
import { HandleRpcExceptions } from 'src/common/decorators';
import { plainToInstance } from 'class-transformer';
import { AreaResponseDto } from './dto/response/area-response.dto';

@Injectable()
export class AreasService {
  constructor(private readonly areasRepository: AreasRepository) {}

  @HandleRpcExceptions()
  async save(request: CreateAreaDto): Promise<AreaEntity> {
    return await this.areasRepository.save(request);
  }

  @HandleRpcExceptions()
  async findAll(): Promise<AreaEntity[]> {
    return await this.areasRepository.findAll();
  }

  @HandleRpcExceptions()
  async findOneById(id: string): Promise<AreaResponseDto> {
    const area = await this.areasRepository.findOneById(id);

    return plainToInstance(AreaResponseDto, area, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async update(request: UpdateAreaDto): Promise<AreaEntity> {
    return this.areasRepository.update(request);
  }

  @HandleRpcExceptions()
  async deleteById(id: string): Promise<AreaEntity> {
    return this.areasRepository.deleteById(id);
  }
}
