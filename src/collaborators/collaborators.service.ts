import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CollaboratorResponseDto } from './dto/response';
import { HandleRpcExceptions } from 'src/common/decorators';
import { CollaboratorsRepository } from './repository/collaborators.repository';
import {
  CreateCollaboratorDto,
  UpdateCollaboratorDto,
  FindOneCollaboratorById,
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
  async save(request: CreateCollaboratorDto): Promise<CollaboratorResponseDto> {
    const collaborator = await this.collaboratorsRepository.save(request);

    return plainToInstance(CollaboratorResponseDto, collaborator, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async update(
    request: UpdateCollaboratorDto,
  ): Promise<CollaboratorResponseDto> {
    const collaborator = await this.collaboratorsRepository.update(request);

    return plainToInstance(CollaboratorResponseDto, collaborator, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async deleteById(collaboratorId: string): Promise<CollaboratorResponseDto> {
    const collaborator =
      await this.collaboratorsRepository.deleteById(collaboratorId);

    return plainToInstance(CollaboratorResponseDto, collaborator, {
      excludeExtraneousValues: true,
    });
  }
}
