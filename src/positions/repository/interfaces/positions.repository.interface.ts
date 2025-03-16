import { IRepository } from 'src/common/repository';
import {
  CreatePositionRequest,
  FindOnePositionRequest,
} from 'src/grpc/proto/collaborators/positions.pb';
import { Position } from 'src/positions/entity/position.entity';

export interface IPositionsRepository
  extends IRepository<
    Position,
    CreatePositionRequest,
    FindOnePositionRequest
  > {}
