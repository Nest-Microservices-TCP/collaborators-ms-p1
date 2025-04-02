import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import {
  CreateAreaRequest,
  FindAreasResponse,
  FindOneAreaRequest,
} from 'src/grpc/proto/collaborators/areas.pb';

import { AreasRepository } from './repository/areas.repository';
import { Area } from './entity/area.entity';

@Injectable()
export class AreasService {
  constructor(private readonly areasRepository: AreasRepository) {}

  @HandleRpcExceptions()
  async save(request: CreateAreaRequest): Promise<void> {
    this.areasRepository.save(request);
  }

  @HandleRpcExceptions()
  async find(): Promise<FindAreasResponse> {
    const areas = await this.areasRepository.find();

    return { areas };
  }

  @HandleRpcExceptions()
  async findOne(request: FindOneAreaRequest): Promise<Area> {
    return this.areasRepository.findOne(request);
  }

  @HandleRpcExceptions()
  async softDelete(request: { area_id: string }): Promise<Area> {
    const { area_id } = request;

    return this.areasRepository.softDelete(area_id);
  }
}
