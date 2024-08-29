import { HttpStatus, Injectable } from '@nestjs/common';
import { CollaboratorsRepository } from './repositories/collaborators.repository';
import { CollaboratorEntity } from './entities/collaborator.entity';
import { RpcException } from '@nestjs/microservices';
import { FindOneCollaboratorById } from './dto/find-one-collaborator-by-id.dto';

@Injectable()
export class CollaboratorsService {
  constructor(
    private readonly collaboratorsRepository: CollaboratorsRepository,
  ) {}

  async findAll(): Promise<CollaboratorEntity[]> {
    try {
      return this.collaboratorsRepository.findAll();
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error to get all collaborators: ${error}`,
      });
    }
  }

  async findOneById(
    request: FindOneCollaboratorById,
  ): Promise<CollaboratorEntity> {
    const { collaborator_id } = request;

    try {
      return await this.collaboratorsRepository.findOneById(collaborator_id);
    } catch (error) {
      throw new RpcException({
        code: 500,
        message: `Error to get the collaborator with the provided ID: ${error}`,
      });
    }
  }
}
