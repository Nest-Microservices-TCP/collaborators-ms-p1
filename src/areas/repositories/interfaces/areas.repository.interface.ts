import { CreateAreaDto, UpdateAreaDto } from 'src/areas/dto/request';
import { IBaseRepository } from 'src/common/interfaces';
import { AreaEntity } from 'src/areas/entities/area.entity';

export interface IAreasRepository
  extends IBaseRepository<AreaEntity, CreateAreaDto, UpdateAreaDto> {}
