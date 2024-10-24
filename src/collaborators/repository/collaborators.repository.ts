import { ICollaboratorsRepository } from './interfaces/collaborators.repository.interface';
import { CreateCollaboratorDto, UpdateCollaboratorDto } from '../dto/request';
import { CollaboratorEntity } from '../entity/collaborator.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';
import {
  In,
  Repository,
  QueryRunner,
  UpdateResult,
  FindOptionsWhere,
} from 'typeorm';
import {
  FailedRemoveException,
  FailedRestoreException,
  EntityNotFoundException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

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

  async remove(collaboratorId: string): Promise<CollaboratorEntity> {
    await this.findOneById(collaboratorId);

    const result: UpdateResult = await this.collaboratorsRepository.update(
      collaboratorId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result.affected !== 1) {
      throw new FailedRemoveException('collaborator');
    }

    return this.findOneById(collaboratorId);
  }

  findByIds(collaboratorsIds: string[]): Promise<CollaboratorEntity[]> {
    return this.collaboratorsRepository.find({
      where: {
        collaboratorId: In(collaboratorsIds),
      },
    });
  }

  findByCriteria(
    criteria: FindOptionsWhere<CollaboratorEntity>,
  ): Promise<CollaboratorEntity> {
    return this.collaboratorsRepository.findOne({ where: criteria });
  }

  findWithRelations(relations: string[]): Promise<CollaboratorEntity[]> {
    return this.collaboratorsRepository.find({
      relations,
    });
  }

  count(criteria: FindOptionsWhere<CollaboratorEntity>): Promise<number> {
    return this.collaboratorsRepository.count({ where: criteria });
  }

  paginate(
    page: number,
    limit: number,
  ): Promise<[CollaboratorEntity[], number]> {
    return this.collaboratorsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async exists(
    criteria: FindOptionsWhere<CollaboratorEntity>,
  ): Promise<boolean> {
    const count = await this.collaboratorsRepository.count({ where: criteria });

    return count > 0;
  }

  async softDelete(collaboratorId: string): Promise<CollaboratorEntity> {
    await this.findOneById(collaboratorId);

    const result: UpdateResult = await this.collaboratorsRepository.update(
      collaboratorId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result?.affected === 0) {
      throw new FailedSoftDeleteException('collaborator');
    }

    return this.findOneById(collaboratorId);
  }

  async restore(collaboratorId: string): Promise<CollaboratorEntity> {
    await this.findOneById(collaboratorId);

    const result: UpdateResult = await this.collaboratorsRepository.update(
      collaboratorId,
      {
        status: Status.ACTIVE,
        deletedAt: null,
      },
    );

    if (result?.affected === 0) {
      throw new FailedRestoreException('collaborator');
    }

    return this.findOneById(collaboratorId);
  }

  bulkSave(collaborators: CollaboratorEntity[]): Promise<CollaboratorEntity[]> {
    return this.collaboratorsRepository.save(collaborators);
  }

  bulkUpdate(
    collaborators: CollaboratorEntity[],
  ): Promise<CollaboratorEntity[]> {
    return this.collaboratorsRepository.save(collaborators);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.collaboratorsRepository.query(query, params);
  }
}
