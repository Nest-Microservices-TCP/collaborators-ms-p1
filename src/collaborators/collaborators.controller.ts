import { Controller } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorEntity } from './entities/collaborator.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateCollaboratorDto,
  FindOneCollaboratorById,
  UpdateCollaboratorDto,
} from './dto/request';

@Controller()
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @MessagePattern({ cmd: 'find.all.collaborators' })
  async findAll(): Promise<CollaboratorEntity[]> {
    return this.collaboratorsService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.collaborator.by.id' })
  async findOneById(
    @Payload() request: FindOneCollaboratorById,
  ): Promise<CollaboratorEntity> {
    return this.collaboratorsService.findOneById(request);
  }

  @MessagePattern({ cmd: 'save.collaborator' })
  async save(
    @Payload() request: CreateCollaboratorDto,
  ): Promise<CollaboratorEntity> {
    return this.collaboratorsService.save(request);
  }

  @MessagePattern({ cmd: 'update.collaborator' })
  async update(
    @Payload() request: UpdateCollaboratorDto,
  ): Promise<CollaboratorEntity> {
    return this.collaboratorsService.update(request);
  }

  @MessagePattern({ cmd: 'delete.collaborator.by.id' })
  async deleteById(@Payload('id') id: string): Promise<CollaboratorEntity> {
    return this.collaboratorsService.deleteById(id);
  }
}
