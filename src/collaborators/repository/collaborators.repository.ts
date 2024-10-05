import { Status } from 'src/common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { QueryRunner, Repository, UpdateResult } from 'typeorm';
import { CollaboratorEntity } from '../entity/collaborator.entity';
import { EntityNotFoundException } from 'src/common/exceptions/custom';
import { CreateCollaboratorDto, UpdateCollaboratorDto } from '../dto/request';
import { ICollaboratorsRepository } from './interfaces/collaborators.repository.interface';

export class CollaboratorsRepository implements ICollaboratorsRepository {
  private collaboratorsRepository: Repository<CollaboratorEntity>;

  constructor(
    @InjectRepository(CollaboratorEntity)
    private readonly defaultRepository: Repository<CollaboratorEntity>,
  ) {
    this.collaboratorsRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.collaboratorsRepository =
        queryRunner.manager.getRepository(CollaboratorEntity);
    } else {
      this.collaboratorsRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<CollaboratorEntity[]> {
    return this.collaboratorsRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOneById(collaboratorId: string): Promise<CollaboratorEntity> {
    const collaborator = await this.collaboratorsRepository.findOne({
      where: { collaboratorId },
    });

    if (!collaborator) {
      throw new EntityNotFoundException('collaborator');
    }

    return collaborator;
  }

  create(request: Partial<CollaboratorEntity>): CollaboratorEntity {
    return this.collaboratorsRepository.create(request);
  }

  save(request: CreateCollaboratorDto): Promise<CollaboratorEntity> {
    return this.collaboratorsRepository.save(request);
  }

  async update(request: UpdateCollaboratorDto): Promise<CollaboratorEntity> {
    const { collaboratorId } = request;

    const collaborator = await this.findOneById(collaboratorId);

    Object.assign(collaborator, request);

    return await this.collaboratorsRepository.save(collaborator);
  }

  async deleteById(collaboratorId: string): Promise<CollaboratorEntity> {
    await this.findOneById(collaboratorId);

    const result: UpdateResult = await this.collaboratorsRepository.update(
      collaboratorId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result.affected !== 1) {
      throw new InternalServerErrorException(
        'Error to delete the collaborator, try later',
      );
    }

    return this.findOneById(collaboratorId);
  }
}
