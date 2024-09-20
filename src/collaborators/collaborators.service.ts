import { Injectable } from '@nestjs/common';
import { CollaboratorsRepository } from './repositories/collaborators.repository';
import { CollaboratorEntity } from './entities/collaborator.entity';
import { HandleRpcExceptions } from 'src/common/decorators';
import { CollaboratorResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
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
  async findAll(): Promise<CollaboratorResponseDto[]> {
    const collaborators = await this.collaboratorsRepository.findAll();

    return plainToInstance(CollaboratorResponseDto, collaborators, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findOneById(
    request: FindOneCollaboratorById,
  ): Promise<CollaboratorResponseDto> {
    const { collaboratorId } = request;

    const collaborator =
      await this.collaboratorsRepository.findOneById(collaboratorId);

    return plainToInstance(CollaboratorResponseDto, collaborator, {
      excludeExtraneousValues: true,
    });
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
