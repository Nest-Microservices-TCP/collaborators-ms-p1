import { PositionsRepository } from './repositories/positions.repository';
import { PositionEntity } from './entities/position.entity';
import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

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
}
