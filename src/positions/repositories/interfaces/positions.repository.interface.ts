import { IBaseRepository } from 'src/common/interfaces';
import { CreatePositionDto, UpdatePositionDto } from 'src/positions/dto';
import { PositionEntity } from 'src/positions/entities/position.entity';

export interface IPositionsRepository
  extends IBaseRepository<
    PositionEntity,
    CreatePositionDto,
    UpdatePositionDto
  > {}