import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  Position,
  FindPositionsResponse,
  CreatePositionRequest,
  FindOnePositionRequest,
  FindPositionsByIdsRequest,
  PositionsServiceController,
  PositionsServiceControllerMethods,
} from 'src/grpc/proto-files/collaborators/positions.pb';

import { PositionsService } from './positions.service';

@Controller()
@PositionsServiceControllerMethods()
export class PositionsController implements PositionsServiceController {
  constructor(private readonly positionsService: PositionsService) {}

  save(request: CreatePositionRequest): void {
    this.positionsService.save(request);
  }
  find():
    | Promise<FindPositionsResponse>
    | Observable<FindPositionsResponse>
    | FindPositionsResponse {
    return this.positionsService.find();
  }
  findOne(
    request: FindOnePositionRequest,
  ): Promise<Position> | Observable<Position> | Position {
    return this.positionsService.findOne(request);
  }
  findByIds(
    request: FindPositionsByIdsRequest,
  ):
    | Promise<FindPositionsResponse>
    | Observable<FindPositionsResponse>
    | FindPositionsResponse {
    return this.positionsService.findByIds(request);
  }
}
