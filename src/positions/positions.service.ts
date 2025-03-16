import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import {
  FindPositionsResponse,
  CreatePositionRequest,
  FindOnePositionRequest,
} from 'src/grpc/proto/collaborators/positions.pb';

import { PositionsRepository } from './repository/positions.repository';

import { Position } from './entity/position.entity';

@Injectable()
export class PositionsService {
  constructor(private readonly positionsRepository: PositionsRepository) {}

  @HandleRpcExceptions()
  async save(request: CreatePositionRequest): Promise<void> {
    this.positionsRepository.save(request);
  }

  @HandleRpcExceptions()
  async find(): Promise<FindPositionsResponse> {
    const positions = await this.positionsRepository.find();

    return { positions };
  }

  @HandleRpcExceptions()
  async findOne(request: FindOnePositionRequest): Promise<Position> {
    return this.positionsRepository.findOne(request);
  }
}
