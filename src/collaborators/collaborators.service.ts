import { CollaboratorsRepository } from './repository/collaborators.repository';
import { HandleRpcExceptions } from 'src/common/decorators';
import { CollaboratorResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
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
  async remove(collaboratorId: string): Promise<CollaboratorResponseDto> {
    const collaborator =
      await this.collaboratorsRepository.remove(collaboratorId);

    return plainToInstance(CollaboratorResponseDto, collaborator, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findByIds(
    collaboratorsIds: string[],
  ): Promise<CollaboratorResponseDto[]> {
    const collaborators =
      await this.collaboratorsRepository.findByIds(collaboratorsIds);

    return plainToInstance(CollaboratorResponseDto, collaborators, {
      excludeExtraneousValues: true,
    });
  }
}
