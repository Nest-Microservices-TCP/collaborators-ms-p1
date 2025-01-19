import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityNotFoundException,
  FailedRemoveException,
  FailedRestoreException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';
import {
  DeleteResult,
  FindOptionsWhere,
  In,
  QueryRunner,
  Repository,
  UpdateResult,
} from 'typeorm';

import { Status } from 'src/common/enums';
import { Collaborator } from '../entity/collaborator.entity';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateCollaboratorDto } from '../dto/request';

import { ICollaboratorsRepository } from './interfaces/collaborators.repository.interface';

export class CollaboratorsRepository implements ICollaboratorsRepository {
  private collaboratorsRepository: Repository<Collaborator>;

  constructor(
    @InjectRepository(Collaborator)
    private readonly defaultRepository: Repository<Collaborator>,
  ) {
    this.collaboratorsRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.collaboratorsRepository =
        queryRunner.manager.getRepository(Collaborator);
    } else {
      this.collaboratorsRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<Collaborator[]> {
    return this.collaboratorsRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOne(collaboratorId: string): Promise<Collaborator> {
    const collaborator = await this.collaboratorsRepository.findOne({
      where: { collaboratorId },
    });

    if (!collaborator) {
      throw new EntityNotFoundException('collaborator');
    }

    return collaborator;
  }

  create(request: Partial<Collaborator>): Collaborator {
    return this.collaboratorsRepository.create(request);
  }

  save(request: CreateCollaboratorDto): Promise<Collaborator> {
    return this.collaboratorsRepository.save(request);
  }

  async update(
    conditions: FindOptionsWhere<Collaborator>,
    request: Partial<Collaborator>,
  ): Promise<Collaborator> {
    const collaborator = await this.findByCriteria(conditions);

    Object.assign(collaborator, request);

    return await this.collaboratorsRepository.save(collaborator);
  }

  async remove(collaboratorId: string): Promise<DeleteResultResponse> {
    await this.findOne(collaboratorId);

    const result: DeleteResult =
      await this.collaboratorsRepository.delete(collaboratorId);

    if (result?.affected === 0) {
      throw new FailedRemoveException('collaborator');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(collaboratorsIds: string[]): Promise<Collaborator[]> {
    return this.collaboratorsRepository.find({
      where: {
        collaboratorId: In(collaboratorsIds),
      },
    });
  }

  async findByCriteria(
    criteria: FindOptionsWhere<Collaborator>,
  ): Promise<Collaborator> {
    const collaborator = await this.collaboratorsRepository.findOne({
      where: criteria,
    });

    if (!collaborator) {
      throw new EntityNotFoundException('collaborator');
    }

    return collaborator;
  }

  findWithRelations(relations: string[]): Promise<Collaborator[]> {
    return this.collaboratorsRepository.find({
      relations,
    });
  }

  count(criteria: FindOptionsWhere<Collaborator>): Promise<number> {
    return this.collaboratorsRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[Collaborator[], number]> {
    return this.collaboratorsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async exists(criteria: FindOptionsWhere<Collaborator>): Promise<boolean> {
    const count = await this.collaboratorsRepository.count({ where: criteria });

    return count > 0;
  }

  async softDelete(collaboratorId: string): Promise<Collaborator> {
    await this.findOne(collaboratorId);

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

    return this.findOne(collaboratorId);
  }

  async restore(collaboratorId: string): Promise<Collaborator> {
    await this.findOne(collaboratorId);

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

    return this.findOne(collaboratorId);
  }

  bulkSave(collaborators: Collaborator[]): Promise<Collaborator[]> {
    return this.collaboratorsRepository.save(collaborators);
  }

  bulkUpdate(collaborators: Collaborator[]): Promise<Collaborator[]> {
    return this.collaboratorsRepository.save(collaborators);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.collaboratorsRepository.query(query, params);
  }
}
