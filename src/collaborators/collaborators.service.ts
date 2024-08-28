import { HttpStatus, Injectable } from '@nestjs/common';
import { CollaboratorsRepository } from './repositories/collaborators.repository';
import { CollaboratorEntity } from './entities/collaborator.entity';
import { RpcException } from '@nestjs/microservices';

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
}
