import { IsUUID } from 'class-validator';

export class FindOneCollaboratorById {
  @IsUUID()
  collaborator_id: string;
}
