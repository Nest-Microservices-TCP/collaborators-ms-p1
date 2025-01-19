import { CreateCollaboratorDto } from 'src/collaborators/dto/request';
import { Collaborator } from 'src/collaborators/entity/collaborator.entity';
import { IRepository } from 'src/common/repository';

export interface ICollaboratorsRepository
  extends IRepository<Collaborator, CreateCollaboratorDto> {}
