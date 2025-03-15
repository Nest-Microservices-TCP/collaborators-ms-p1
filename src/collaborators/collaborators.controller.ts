import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  Collaborator,
  FindCollaboratorsResponse,
  CreateCollaboratorRequest,
  FindOneCollaboratorRequest,
  CollaboratorsServiceController,
  CollaboratorsServiceControllerMethods,
} from 'src/grpc/proto/collaborators/collaborators.pb';

import { CollaboratorsService } from './collaborators.service';

@Controller()
@CollaboratorsServiceControllerMethods()
export class CollaboratorsController implements CollaboratorsServiceController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  save(request: CreateCollaboratorRequest): void {
    this.collaboratorsService.save(request);
  }
  findOne(
    request: FindOneCollaboratorRequest,
  ): Promise<Collaborator> | Observable<Collaborator> | Collaborator {
    return this.collaboratorsService.findOne(request);
  }
  find():
    | Promise<FindCollaboratorsResponse>
    | Observable<FindCollaboratorsResponse>
    | FindCollaboratorsResponse {
    return this.collaboratorsService.find();
  }
}
