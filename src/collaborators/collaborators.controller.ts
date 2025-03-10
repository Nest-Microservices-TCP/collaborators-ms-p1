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

  @MessagePattern('collaborators.find.all')
  async findAll(): Promise<CollaboratorResponseDto[]> {
    return this.collaboratorsService.findAll();
  }

  @MessagePattern('collaborators.find.one')
  async findOne(
    @Payload() request: FindOneCollaboratorById,
  ): Promise<CollaboratorResponseDto> {
    return this.collaboratorsService.findOne(request);
  }

  @MessagePattern('collaborators.save')
  async save(
    @Payload() request: CreateCollaboratorDto,
  ): Promise<CollaboratorResponseDto> {
    return this.collaboratorsService.save(request);
  }

  @MessagePattern('collaborators.update')
  async update(
    @Payload() request: UpdateCollaboratorDto,
  ): Promise<CollaboratorResponseDto> {
    return this.collaboratorsService.update(request);
  }

  @MessagePattern('collaborators.remove')
  async remove(
    @Payload('collaboratorId') collaboratorId: string,
  ): Promise<DeleteResultResponse> {
    return this.collaboratorsService.remove(collaboratorId);
  }

  @MessagePattern('collaborators.find.by.ids')
  async findByIds(
    @Payload('collaboratorsIds') collaboratorsIds: string[],
  ): Promise<CollaboratorResponseDto[]> {
    return this.collaboratorsService.findByIds(collaboratorsIds);
  }
}
