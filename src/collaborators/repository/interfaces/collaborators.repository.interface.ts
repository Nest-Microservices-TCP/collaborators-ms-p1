import { Collaborator } from 'src/collaborators/entity/collaborator.entity';
import { IBaseRepository } from 'src/common/interfaces';
import {
  CreateCollaboratorDto,
  UpdateCollaboratorDto,
} from 'src/collaborators/dto/request';

export interface ICollaboratorsRepository
  extends IBaseRepository<
    Collaborator,
    CreateCollaboratorDto,
    UpdateCollaboratorDto
  > {}
