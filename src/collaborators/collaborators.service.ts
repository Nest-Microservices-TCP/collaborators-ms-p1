import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { HandleRpcExceptions } from 'src/common/decorators';

import { DeleteResultResponse } from 'src/common/dto/response';
import {
  CreateCollaboratorDto,
  FindOneCollaboratorById,
  UpdateCollaboratorDto,
} from './dto/request';
import { CollaboratorResponseDto } from './dto/response';

import { CollaboratorsRepository } from './repository/collaborators.repository';

@Injectable()
export class CollaboratorsService {
  constructor(
    private readonly collaboratorsRepository: CollaboratorsRepository,
  ) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(CollaboratorResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<CollaboratorResponseDto[]> {
    const collaborators = await this.collaboratorsRepository.findAll();

    return this.plainToInstanceDto(collaborators);
  }

  @HandleRpcExceptions()
  async findOne(
    request: FindOneCollaboratorById,
  ): Promise<CollaboratorResponseDto> {
    const { collaboratorId } = request;

    const collaborator =
      await this.collaboratorsRepository.findOne(collaboratorId);

    return this.plainToInstanceDto(collaborator);
  }

  @HandleRpcExceptions()
  async findByIds(
    collaboratorsIds: string[],
  ): Promise<CollaboratorResponseDto[]> {
    const collaborators =
      await this.collaboratorsRepository.findByIds(collaboratorsIds);

    return this.plainToInstanceDto(collaborators);
  }

  @HandleRpcExceptions()
  async save(request: CreateCollaboratorDto): Promise<CollaboratorResponseDto> {
    const newCollaborator = await this.collaboratorsRepository.save(request);

    return this.plainToInstanceDto(newCollaborator);
  }

  @HandleRpcExceptions()
  async update(
    request: UpdateCollaboratorDto,
  ): Promise<CollaboratorResponseDto> {
    const { collaboratorId, ...rest } = request;

    const updatedCollaborator = await this.collaboratorsRepository.update(
      { collaboratorId },
      rest,
    );

    return this.plainToInstanceDto(updatedCollaborator);
  }

  @HandleRpcExceptions()
  async remove(collaboratorId: string): Promise<DeleteResultResponse> {
    const deleteResult =
      await this.collaboratorsRepository.remove(collaboratorId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }
}
