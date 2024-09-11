import { Injectable } from '@nestjs/common';
import { CollaboratorsRepository } from './repositories/collaborators.repository';
import { CollaboratorEntity } from './entities/collaborator.entity';
import { FindOneCollaboratorById } from './dto/find-one-collaborator-by-id.dto';
import { CreateCollaboratorDto } from './dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { HandleRpcExceptions } from 'src/common/decorators';

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

    return await this.collaboratorsRepository.findOneById(collaboratorId);
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
