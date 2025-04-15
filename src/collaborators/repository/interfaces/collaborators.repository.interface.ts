import { IRepository } from 'src/common/repository';
import {
  CreateCollaboratorRequest,
  FindOneCollaboratorRequest,
} from 'src/grpc/collaborators/collaborators.pb';
import { Collaborator } from 'src/collaborators/entity/collaborator.entity';

export interface ICollaboratorsRepository
  extends IRepository<
    Collaborator,
    CreateCollaboratorRequest,
    FindOneCollaboratorRequest
  > {}
