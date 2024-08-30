import { UpdateAreaDto } from 'src/areas/dto/update-area.dto';
import { IBaseRepository } from 'src/common/interfaces';
import { CreateAreaDto } from 'src/areas/dto';
import { AreaEntity } from 'src/areas/entities/area.entity';

export interface IAreasRepository
  extends IBaseRepository<AreaEntity, CreateAreaDto, UpdateAreaDto> {}
