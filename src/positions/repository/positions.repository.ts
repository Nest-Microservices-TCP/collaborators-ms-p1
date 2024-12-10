import { IPositionsRepository } from './interfaces/positions.repository.interface';
import { CreatePositionDto, UpdatePositionDto } from '../dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';
import { Status } from 'src/common/enums/status.enum';
import { Position } from '../entity/position.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  In,
  Repository,
  QueryRunner,
  DeleteResult,
  UpdateResult,
  FindOptionsWhere,
} from 'typeorm';
import {
  FailedRemoveException,
  FailedRestoreException,
  EntityNotFoundException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

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

  findAll(): Promise<Position[]> {
    return this.positionsRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOne(positionId: string): Promise<Position> {
    const position = await this.positionsRepository.findOne({
      where: { positionId },
    });

    if (!position) {
      throw new EntityNotFoundException('position');
    }

    return position;
  }

  create(request: Partial<Position>): Position {
    return this.positionsRepository.create(request);
  }

  async save(request: CreatePositionDto): Promise<Position> {
    return this.positionsRepository.save(request);
  }

  async update(request: UpdatePositionDto): Promise<Position> {
    const { positionId } = request;

    const position = await this.findOne(positionId);

    Object.assign(position, request);

    return this.positionsRepository.save(position);
  }

  async remove(positionId: string): Promise<DeleteResultResponse> {
    await this.findOne(positionId);

    const result: DeleteResult =
      await this.positionsRepository.delete(positionId);

    if (result?.affected === 0) {
      throw new FailedRemoveException('position');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(positionsIds: string[]): Promise<Position[]> {
    return this.positionsRepository.find({
      where: {
        positionId: In(positionsIds),
      },
    });
  }

  findByCriteria(criteria: FindOptionsWhere<Position>): Promise<Position> {
    return this.positionsRepository.findOne({ where: criteria });
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

  async softDelete(positionId: string): Promise<Position> {
    await this.findOne(positionId);

    const result: UpdateResult = await this.positionsRepository.update(
      positionId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result.affected === 0) {
      throw new FailedSoftDeleteException('position');
    }

    return this.findOne(positionId);
  }

  async restore(positionId: string): Promise<Position> {
    await this.findOne(positionId);

    const result: UpdateResult = await this.positionsRepository.update(
      positionId,
      {
        status: Status.ACTIVE,
        deletedAt: null,
      },
    );

    if (result?.affected === 0) {
      throw new FailedRestoreException('position');
    }

    return this.findOne(positionId);
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
