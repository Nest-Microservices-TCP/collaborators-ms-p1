import { CreateCollaboratorDto } from 'src/collaborators/dto/create-collaborator.dto';
import { CollaboratorEntity } from 'src/collaborators/entities/collaborator.entity';

export interface ICollaboratorsRepository {
  findAll(): Promise<CollaboratorEntity[]>;
  findOneById(id: string): Promise<CollaboratorEntity>;
  create(request: Partial<CollaboratorEntity>): CollaboratorEntity;
  save(request: CreateCollaboratorDto): Promise<CollaboratorEntity>;
  deletedById(id: string): Promise<CollaboratorEntity>;
}
