import { IBaseRepository } from 'src/common/interfaces';
import {
  CreatePositionDto,
  UpdatePositionDto,
} from 'src/positions/dto/request';
import { PositionEntity } from 'src/positions/entity/position.entity';

export interface IPositionsRepository
  extends IBaseRepository<
    PositionEntity,
    CreatePositionDto,
    UpdatePositionDto
  > {}
