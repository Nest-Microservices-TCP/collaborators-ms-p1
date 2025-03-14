import { Area } from 'src/areas/entity/area.entity';
import { IRepository } from 'src/common/repository';
import {
  CreateAreaRequest,
  FindOneAreaRequest,
} from 'src/grpc/proto/collaborators/areas.pb';

export interface IAreasRepository
  extends IRepository<Area, CreateAreaRequest, FindOneAreaRequest> {}
