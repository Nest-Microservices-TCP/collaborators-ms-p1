import { Position } from 'src/positions/entity/position.entity';
import { IBaseRepository } from 'src/common/interfaces';
import {
  CreatePositionDto,
  UpdatePositionDto,
} from 'src/positions/dto/request';

export interface IPositionsRepository
  extends IBaseRepository<Position, CreatePositionDto, UpdatePositionDto> {}
