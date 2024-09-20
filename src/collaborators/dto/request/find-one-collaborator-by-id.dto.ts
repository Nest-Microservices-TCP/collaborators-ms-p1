import { IsUUID } from 'class-validator';

export class FindOneCollaboratorById {
  @IsUUID()
  collaboratorId: string;
}
