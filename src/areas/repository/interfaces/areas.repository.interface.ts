import { CreateAreaDto, UpdateAreaDto } from 'src/areas/dto/request';
import { Area } from 'src/areas/entity/area.entity';
import { IRepository } from 'src/common/repository';

export interface IAreasRepository
  extends IRepository<Area, CreateAreaDto, UpdateAreaDto> {}
