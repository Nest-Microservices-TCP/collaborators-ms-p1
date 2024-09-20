import { Injectable } from '@nestjs/common';
import { CollaboratorsRepository } from './repositories/collaborators.repository';
import { CollaboratorEntity } from './entities/collaborator.entity';
import { HandleRpcExceptions } from 'src/common/decorators';
import {
  CreateCollaboratorDto,
  FindOneCollaboratorById,
  UpdateCollaboratorDto,
} from './dto/request';

@Injectable()
export class CollaboratorsService {
  constructor(
    private readonly collaboratorsRepository: CollaboratorsRepository,
  ) {}

  @HandleRpcExceptions()
  async findAll(): Promise<CollaboratorEntity[]> {
    return this.collaboratorsRepository.findAll();
  }

  @HandleRpcExceptions()
  async findOneById(
    request: FindOneCollaboratorById,
  ): Promise<CollaboratorEntity> {
    const { collaboratorId } = request;

    return this.collaboratorsRepository.findOneById(collaboratorId);
  }

  @HandleRpcExceptions()
  async save(request: CreateCollaboratorDto): Promise<CollaboratorEntity> {
    return this.collaboratorsRepository.save(request);
  }

  @HandleRpcExceptions()
  async update(request: UpdateCollaboratorDto): Promise<CollaboratorEntity> {
    return this.collaboratorsRepository.update(request);
  }

  @HandleRpcExceptions()
  async deleteById(id: string): Promise<CollaboratorEntity> {
    return this.collaboratorsRepository.deleteById(id);
  }
}
