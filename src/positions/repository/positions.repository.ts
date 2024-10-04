/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryRunner, Repository, UpdateResult } from 'typeorm';
import { CreatePositionDto, UpdatePositionDto } from '../dto/request';
import { PositionEntity } from '../entity/position.entity';
import { IPositionsRepository } from './interfaces/positions.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityNotFoundException } from 'src/common/exceptions/custom';
import { Status } from 'src/common/enums/status.enum';

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
  async findOneById(position_id: string): Promise<PositionEntity> {
    const position = await this.positionsRepository.findOne({
      where: { position_id },
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
      position.position_id,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result.affected === 0) {
      throw new InternalServerErrorException(
        'Error to delete the positions, try later',
      );
    }

    return this.findOneById(position.position_id);
  }
}
