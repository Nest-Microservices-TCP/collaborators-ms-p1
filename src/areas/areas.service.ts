import { Injectable } from '@nestjs/common';

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

  async save(request: CreateAreaRequest): Promise<void> {
    this.areasRepository.save(request);
  }

  async find(): Promise<FindAreasResponse> {
    const areas = await this.areasRepository.find();

    return { areas };
  }

  async findOne(request: FindOneAreaRequest): Promise<Area> {
    return this.areasRepository.findOne(request);
  }
}
