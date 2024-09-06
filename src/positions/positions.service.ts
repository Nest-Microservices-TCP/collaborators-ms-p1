import { PositionsRepository } from './repositories/positions.repository';
import { PositionEntity } from './entities/position.entity';
import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';
import { CreatePositionDto } from './dto';

@Injectable()
export class PositionsService {
  constructor(private readonly positionsRepository: PositionsRepository) {}

  @HandleRpcExceptions()
  findAll(): Promise<PositionEntity[]> {
    return this.positionsRepository.findAll();
  }

  @HandleRpcExceptions()
  findOneById(id: string): Promise<PositionEntity> {
    return this.positionsRepository.findOneById(id);
  }

  @HandleRpcExceptions()
  save(request: CreatePositionDto): Promise<PositionEntity> {
    return this.positionsRepository.save(request);
  }
}
