import {
  CreateCollaboratorDto,
  UpdateCollaboratorDto,
  FindOneCollaboratorById,
} from './dto/request';
import { Controller } from '@nestjs/common';
import { CollaboratorResponseDto } from './dto/response';
import { CollaboratorsService } from './collaborators.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @MessagePattern({ cmd: 'find.all.collaborators' })
  async findAll(): Promise<CollaboratorResponseDto[]> {
    return this.collaboratorsService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.collaborator.by.id' })
  async findOneById(
    @Payload() request: FindOneCollaboratorById,
  ): Promise<CollaboratorResponseDto> {
    return this.collaboratorsService.findOneById(request);
  }

  @MessagePattern({ cmd: 'save.collaborator' })
  async save(
    @Payload() request: CreateCollaboratorDto,
  ): Promise<CollaboratorResponseDto> {
    return this.collaboratorsService.save(request);
  }

  @MessagePattern({ cmd: 'update.collaborator' })
  async update(
    @Payload() request: UpdateCollaboratorDto,
  ): Promise<CollaboratorResponseDto> {
    return this.collaboratorsService.update(request);
  }

  @MessagePattern({ cmd: 'delete.collaborator.by.id' })
  async deleteById(
    @Payload('collaboratorId') collaboratorId: string,
  ): Promise<CollaboratorResponseDto> {
    return this.collaboratorsService.deleteById(collaboratorId);
  }

  @MessagePattern({ cmd: 'find.collaborators.by.ids' })
  async findByIds(
    @Payload() collaboratorsIds: string[],
  ): Promise<CollaboratorResponseDto[]> {
    return this.collaboratorsService.findByIds(collaboratorsIds);
  }
}
