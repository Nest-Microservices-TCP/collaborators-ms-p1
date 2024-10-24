/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPositionsRepository } from './interfaces/positions.repository.interface';
import { CreatePositionDto, UpdatePositionDto } from '../dto/request';
import { PositionEntity } from '../entity/position.entity';
import { Status } from 'src/common/enums/status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import {
  In,
  Repository,
  QueryRunner,
  DeleteResult,
  FindOptionsWhere,
} from 'typeorm';
import {
  FailedRemoveException,
  EntityNotFoundException,
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

  async remove(positionId: string): Promise<PositionEntity> {
    await this.findOneById(positionId);

    const result: DeleteResult =
      await this.positionsRepository.delete(positionId);

    if (result?.affected === 0) {
      throw new FailedRemoveException('position');
    }

    return this.findOneById(positionId);
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

  softDelete(id: string): Promise<PositionEntity> {
    throw new Error('Method not implemented.');
  }
  restore(id: string): Promise<PositionEntity> {
    throw new Error('Method not implemented.');
  }

  bulkSave(entities: PositionEntity[]): Promise<PositionEntity[]> {
    throw new Error('Method not implemented.');
  }
  bulkUpdate(entities: PositionEntity[]): Promise<PositionEntity[]> {
    throw new Error('Method not implemented.');
  }
  customQuery(query: string, params: any[]): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
