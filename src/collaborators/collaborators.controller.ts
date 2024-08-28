import { Controller } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorEntity } from './entities/collaborator.entity';

@Controller()
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  async findAll(): Promise<CollaboratorEntity[]> {
    return this.collaboratorsService.findAll();
  }
}
