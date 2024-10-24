/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  EntityNotFoundException,
  FailedRemoveException,
} from 'src/common/exceptions/custom';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums/status.enum';
import { PositionEntity } from '../entity/position.entity';
import {
  DeleteResult,
  FindOptionsWhere,
  QueryRunner,
  Repository,
} from 'typeorm';
import { CreatePositionDto, UpdatePositionDto } from '../dto/request';
import { IPositionsRepository } from './interfaces/positions.repository.interface';

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

  findByIds(ids: string[]): Promise<PositionEntity[]> {
    throw new Error('Method not implemented.');
  }
  findByCriteria(
    criteria: FindOptionsWhere<PositionEntity>,
  ): Promise<PositionEntity> {
    throw new Error('Method not implemented.');
  }
  findWithRelations(relations: string[]): Promise<PositionEntity[]> {
    throw new Error('Method not implemented.');
  }
  count(criteria: FindOptionsWhere<PositionEntity>): Promise<number> {
    throw new Error('Method not implemented.');
  }
  paginate(page: number, limit: number): Promise<[PositionEntity[], number]> {
    throw new Error('Method not implemented.');
  }
  softDelete(id: string): Promise<PositionEntity> {
    throw new Error('Method not implemented.');
  }
  restore(id: string): Promise<PositionEntity> {
    throw new Error('Method not implemented.');
  }
  exists(criteria: FindOptionsWhere<PositionEntity>): Promise<boolean> {
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
