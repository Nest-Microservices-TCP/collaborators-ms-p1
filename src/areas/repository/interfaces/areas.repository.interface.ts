import { CreateAreaDto, UpdateAreaDto } from 'src/areas/dto/request';
import { IBaseRepository } from 'src/common/interfaces';
import { Area } from 'src/areas/entity/area.entity';

export interface IAreasRepository
  extends IBaseRepository<Area, CreateAreaDto, UpdateAreaDto> {}
