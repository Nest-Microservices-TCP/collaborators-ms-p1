import { HttpStatus, Injectable } from '@nestjs/common';
import { AreaEntity } from './entities/area.entity';
import { CreateAreaDto } from './dto';
import { RpcException } from '@nestjs/microservices';
import { AreasRepository } from './repositories/areas.repository';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreasService {
  constructor(private readonly areasRepository: AreasRepository) {}

  async save(request: CreateAreaDto): Promise<AreaEntity> {
    try {
      return await this.areasRepository.save(request);
    } catch (error) {
      throw new RpcException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error to save the area: ${error}`,
      });
    }
  }

  async findAll(): Promise<AreaEntity[]> {
    try {
      return await this.areasRepository.findAll();
    } catch (error) {
      throw new RpcException({
        code: 500,
        message: `Error to get all areas: ${error}`,
      });
    }
  }

  async update(request: UpdateAreaDto): Promise<AreaEntity> {
    return this.areasRepository.update(request);
  }
}
