import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import {
  CreateCollaboratorRequest,
  FindCollaboratorsResponse,
  FindOneCollaboratorRequest,
} from 'src/grpc/proto/collaborators/collaborators.pb';

import { CollaboratorsRepository } from './repository/collaborators.repository';
import { Collaborator } from './entity/collaborator.entity';

@Injectable()
export class CollaboratorsService {
  constructor(
    private readonly collaboratorsRepository: CollaboratorsRepository,
  ) {}

  @HandleRpcExceptions()
  async find(): Promise<FindCollaboratorsResponse> {
    const collaborators = await this.collaboratorsRepository.find();

    return { collaborators };
  }

  @HandleRpcExceptions()
  async findOne(request: FindOneCollaboratorRequest): Promise<Collaborator> {
    return this.collaboratorsRepository.findOne(request);
  }

  @HandleRpcExceptions()
  async save(request: CreateCollaboratorRequest): Promise<void> {
    this.collaboratorsRepository.save(request);
  }
}
