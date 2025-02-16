import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { DeleteResultResponse } from 'src/common/dto/response';
import {
  CreateCollaboratorDto,
  FindOneCollaboratorById,
  UpdateCollaboratorDto,
} from './dto/request';
import { CollaboratorResponseDto } from './dto/response';

import { CollaboratorsService } from './collaborators.service';

@Controller()
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @MessagePattern('collaborators.find.all.collaborators')
  async findAll(): Promise<CollaboratorResponseDto[]> {
    return this.collaboratorsService.findAll();
  }

  @MessagePattern('collaborators.find.one.collaborator')
  async findOne(
    @Payload() request: FindOneCollaboratorById,
  ): Promise<CollaboratorResponseDto> {
    return this.collaboratorsService.findOne(request);
  }

  @MessagePattern('collaborators.save.collaborator')
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

  @MessagePattern({ cmd: 'remove.collaborator.by.id' })
  async remove(
    @Payload('collaboratorId') collaboratorId: string,
  ): Promise<DeleteResultResponse> {
    return this.collaboratorsService.remove(collaboratorId);
  }

  @MessagePattern({ cmd: 'find.collaborators.by.ids' })
  async findByIds(
    @Payload('collaboratorsIds') collaboratorsIds: string[],
  ): Promise<CollaboratorResponseDto[]> {
    return this.collaboratorsService.findByIds(collaboratorsIds);
  }
}
