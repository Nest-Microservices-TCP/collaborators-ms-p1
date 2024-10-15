import {
  FailedDeleteException,
  EntityNotFoundException,
} from 'src/common/exceptions/custom';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { Status } from 'src/common/enums/status.enum';
import { PositionEntity } from '../entity/position.entity';
import { QueryRunner, Repository, UpdateResult } from 'typeorm';
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

  //TODO: También debería no devolver eliminados
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
    const { name } = request;

    const position = await this.positionsRepository.findOne({
      where: { name },
    });

    if (position) {
      throw new ConflictException(
        `Already exists a position with name: ${name}`,
      );
    }

    return this.positionsRepository.save(request);
  }

  async update(request: UpdatePositionDto): Promise<PositionEntity> {
    const { positionId } = request;

    const position = await this.findOneById(positionId);

    Object.assign(position, request);

    return this.positionsRepository.save(position);
  }

  async deleteById(position_id: string): Promise<PositionEntity> {
    const position = await this.findOneById(position_id);

    const result: UpdateResult = await this.positionsRepository.update(
      position.positionId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result.affected === 0) {
      throw new FailedDeleteException('position');
    }

    return this.findOneById(position.positionId);
  }
}
