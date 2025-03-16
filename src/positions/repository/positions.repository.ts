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
  CreatePositionRequest,
  FindOnePositionRequest,
} from 'src/grpc/proto/collaborators/positions.pb';

import { IPositionsRepository } from './interfaces/positions.repository.interface';

import { Status } from 'src/common/enums/status.enum';
import { Position } from '../entity/position.entity';

import { DeleteResultResponse } from 'src/common/dto/response';

export class PositionsRepository implements IPositionsRepository {
  private positionsRepository: Repository<Position>;

  constructor(
    @InjectRepository(Position)
    private readonly defaultRepository: Repository<Position>,
  ) {
    this.positionsRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.positionsRepository = queryRunner.manager.getRepository(Position);
    } else {
      this.positionsRepository = this.defaultRepository;
    }
  }

  find(): Promise<Position[]> {
    return this.positionsRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOne(request: FindOnePositionRequest): Promise<Position> {
    const { position_id } = request;

    const position = await this.positionsRepository.findOne({
      where: { position_id },
    });

    if (!position) {
      throw new EntityNotFoundException('position');
    }

    return position;
  }

  create(request: Partial<Position>): Position {
    return this.positionsRepository.create(request);
  }

  async save(request: CreatePositionRequest): Promise<Position> {
    return this.positionsRepository.save(request);
  }

  async update(
    conditions: FindOptionsWhere<Position>,
    request: Partial<Position>,
  ): Promise<Position> {
    const position = await this.findByCriteria(conditions);

    Object.assign(position, request);

    return this.positionsRepository.save(position);
  }

  async remove(position_id: string): Promise<DeleteResultResponse> {
    await this.findOne({ position_id });

    const result: DeleteResult = await this.positionsRepository.delete({
      position_id,
    });

    if (result?.affected === 0) {
      throw new FailedRemoveException('position');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(positions_ids: string[]): Promise<Position[]> {
    return this.positionsRepository.find({
      where: {
        position_id: In(positions_ids),
      },
    });
  }

  async findByCriteria(
    criteria: FindOptionsWhere<Position>,
  ): Promise<Position> {
    const position = await this.positionsRepository.findOne({
      where: criteria,
    });

    if (!position) {
      throw new EntityNotFoundException('position');
    }

    return position;
  }

  findWithRelations(relations: string[]): Promise<Position[]> {
    return this.positionsRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<Position>): Promise<number> {
    return this.positionsRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[Position[], number]> {
    return this.positionsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async exists(criteria: FindOptionsWhere<Position>): Promise<boolean> {
    const count = await this.positionsRepository.count({ where: criteria });

    return count > 0;
  }

  async softDelete(position_id: string): Promise<Position> {
    await this.findOne({ position_id });

    const result: UpdateResult = await this.positionsRepository.update(
      position_id,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result.affected === 0) {
      throw new FailedSoftDeleteException('position');
    }

    return this.findOne({ position_id });
  }

  async restore(position_id: string): Promise<Position> {
    await this.findOne({ position_id });

    const result: UpdateResult = await this.positionsRepository.update(
      position_id,
      {
        status: Status.ACTIVE,
        deletedAt: null,
      },
    );

    if (result?.affected === 0) {
      throw new FailedRestoreException('position');
    }

    return this.findOne({ position_id });
  }

  bulkSave(positions: Position[]): Promise<Position[]> {
    return this.positionsRepository.save(positions);
  }

  bulkUpdate(positions: Position[]): Promise<Position[]> {
    return this.positionsRepository.save(positions);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.positionsRepository.query(query, params);
  }
}
