import { Controller } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorEntity } from './entities/collaborator.entity';
import { FindOneCollaboratorById } from './dto/find-one-collaborator-by-id.dto';
import { CreateCollaboratorDto } from './dto';

@Controller()
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  async findAll(): Promise<CollaboratorEntity[]> {
    return this.collaboratorsService.findAll();
  }

  async findOneById(
    request: FindOneCollaboratorById,
  ): Promise<CollaboratorEntity> {
    return this.collaboratorsService.findOneById(request);
  }

  async save(request: CreateCollaboratorDto) {
    return this.collaboratorsService.save(request);
  }
}
