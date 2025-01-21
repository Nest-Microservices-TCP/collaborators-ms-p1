import { IRepository } from 'src/common/repository';
import { CreatePositionDto } from 'src/positions/dto/request';
import { Position } from 'src/positions/entity/position.entity';

export interface IPositionsRepository
  extends IRepository<Position, CreatePositionDto> {}
