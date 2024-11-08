/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPositionsRepository } from './interfaces/positions.repository.interface';
import { CreatePositionDto, UpdatePositionDto } from '../dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';
import { PositionEntity } from '../entity/position.entity';
import { Status } from 'src/common/enums/status.enum';
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
  private positionsRepository: Repository<PositionEntity>;

  constructor(
    @InjectRepository(PositionEntity)
    private readonly defaultRepository: Repository<PositionEntity>,
  ) {
    this.positionsRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.positionsRepository =
        queryRunner.manager.getRepository(PositionEntity);
    } else {
      this.positionsRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<PositionEntity[]> {
    return this.positionsRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOneById(positionId: string): Promise<PositionEntity> {
    const position = await this.positionsRepository.findOne({
      where: { positionId },
    });

    if (!position) {
      throw new EntityNotFoundException('position');
    }

    return position;
  }

  create(request: Partial<PositionEntity>): PositionEntity {
    return this.positionsRepository.create(request);
  }

  async save(request: CreatePositionDto): Promise<PositionEntity> {
    return this.positionsRepository.save(request);
  }

  async update(request: UpdatePositionDto): Promise<PositionEntity> {
    const { positionId } = request;

    const position = await this.findOneById(positionId);

    Object.assign(position, request);

    return this.positionsRepository.save(position);
  }

  async remove(positionId: string): Promise<DeleteResultResponse> {
    await this.findOneById(positionId);

    const result: DeleteResult =
      await this.positionsRepository.delete(positionId);

    if (result?.affected === 0) {
      throw new FailedRemoveException('position');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(positionsIds: string[]): Promise<PositionEntity[]> {
    return this.positionsRepository.find({
      where: {
        positionId: In(positionsIds),
      },
    });
  }

  findByCriteria(
    criteria: FindOptionsWhere<PositionEntity>,
  ): Promise<PositionEntity> {
    return this.positionsRepository.findOne({ where: criteria });
  }

  findWithRelations(relations: string[]): Promise<PositionEntity[]> {
    return this.positionsRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<PositionEntity>): Promise<number> {
    return this.positionsRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[PositionEntity[], number]> {
    return this.positionsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async exists(criteria: FindOptionsWhere<PositionEntity>): Promise<boolean> {
    const count = await this.positionsRepository.count({ where: criteria });

    return count > 0;
  }

  async softDelete(positionId: string): Promise<PositionEntity> {
    await this.findOneById(positionId);

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

    return this.findOneById(positionId);
  }

  async restore(positionId: string): Promise<PositionEntity> {
    await this.findOneById(positionId);

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

    return this.findOneById(positionId);
  }

  bulkSave(positions: PositionEntity[]): Promise<PositionEntity[]> {
    return this.positionsRepository.save(positions);
  }

  bulkUpdate(positions: PositionEntity[]): Promise<PositionEntity[]> {
    return this.positionsRepository.save(positions);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.positionsRepository.query(query, params);
  }
}
