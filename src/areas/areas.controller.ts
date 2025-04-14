import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  Area,
  CreateAreaRequest,
  FindAreasResponse,
  FindOneAreaRequest,
  FindAreasByIdsRequest,
  AreasServiceController,
  AreasServiceControllerMethods,
} from 'src/grpc/collaborators/areas.pb';

import { AreasService } from './areas.service';

@Controller()
@AreasServiceControllerMethods()
export class AreasController implements AreasServiceController {
  constructor(private readonly areasService: AreasService) {}

  save(request: CreateAreaRequest): void {
    this.areasService.save(request);
  }
  find():
    | Promise<FindAreasResponse>
    | Observable<FindAreasResponse>
    | FindAreasResponse {
    return this.areasService.find();
  }
  findOne(
    request: FindOneAreaRequest,
  ): Promise<Area> | Observable<Area> | Area {
    return this.areasService.findOne(request);
  }
  findByIds(
    request: FindAreasByIdsRequest,
  ):
    | Promise<FindAreasResponse>
    | Observable<FindAreasResponse>
    | FindAreasResponse {
    return this.areasService.findByIds(request);
  }
}
