import { CreateCollaboratorDto } from 'src/collaborators/dto';
import { UpdateCollaboratorDto } from 'src/collaborators/dto/update-collaborator.dto';
import { CollaboratorEntity } from 'src/collaborators/entities/collaborator.entity';
import { IBaseRepository } from 'src/common/interfaces';

export interface ICollaboratorsRepository
  extends IBaseRepository<
    CollaboratorEntity,
    CreateCollaboratorDto,
    UpdateCollaboratorDto
  > {}
