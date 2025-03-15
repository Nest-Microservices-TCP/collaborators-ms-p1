import {
  In,
  Repository,
  QueryRunner,
  UpdateResult,
  DeleteResult,
  FindOptionsWhere,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  FailedRemoveException,
  FailedRestoreException,
  EntityNotFoundException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

import {
  CreateCollaboratorRequest,
  FindOneCollaboratorRequest,
} from 'src/grpc/proto/collaborators/collaborators.pb';

import { ICollaboratorsRepository } from './interfaces/collaborators.repository.interface';

import { Status } from 'src/common/enums';
import { Collaborator } from '../entity/collaborator.entity';

import { DeleteResultResponse } from 'src/common/dto/response';

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

  find(): Promise<Collaborator[]> {
    return this.collaboratorsRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOne(request: FindOneCollaboratorRequest): Promise<Collaborator> {
    const { collaborator_id } = request;

    const collaborator = await this.collaboratorsRepository.findOne({
      where: { collaborator_id },
    });

    if (!collaborator) {
      throw new EntityNotFoundException('collaborator');
    }

    return collaborator;
  }

  create(request: Partial<Collaborator>): Collaborator {
    return this.collaboratorsRepository.create(request);
  }

  save(request: CreateCollaboratorRequest): Promise<Collaborator> {
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

  async remove(collaborator_id: string): Promise<DeleteResultResponse> {
    await this.findOne({ collaborator_id });

    const result: DeleteResult =
      await this.collaboratorsRepository.delete(collaborator_id);

    if (result?.affected === 0) {
      throw new FailedRemoveException('collaborator');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(collaborators_ids: string[]): Promise<Collaborator[]> {
    return this.collaboratorsRepository.find({
      where: {
        collaborator_id: In(collaborators_ids),
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

  async softDelete(collaborator_id: string): Promise<Collaborator> {
    await this.findOne({ collaborator_id });

    const result: UpdateResult = await this.collaboratorsRepository.update(
      collaborator_id,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result?.affected === 0) {
      throw new FailedSoftDeleteException('collaborator');
    }

    return this.findOne({ collaborator_id });
  }

  async restore(collaborator_id: string): Promise<Collaborator> {
    await this.findOne({ collaborator_id });

    const result: UpdateResult = await this.collaboratorsRepository.update(
      collaborator_id,
      {
        status: Status.ACTIVE,
        deletedAt: null,
      },
    );

    if (result?.affected === 0) {
      throw new FailedRestoreException('collaborator');
    }

    return this.findOne({ collaborator_id });
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
