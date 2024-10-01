import { CreateAreaDto, UpdateAreaDto } from 'src/areas/dto/request';
import { AreaEntity } from 'src/areas/entity/area.entity';
import { IBaseRepository } from 'src/common/interfaces';

export interface IAreasRepository
  extends IBaseRepository<AreaEntity, CreateAreaDto, UpdateAreaDto> {}
