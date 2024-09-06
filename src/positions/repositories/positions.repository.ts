/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryRunner, Repository } from 'typeorm';
import { CreatePositionDto, UpdatePositionDto } from '../dto';
import { PositionEntity } from '../entities/position.entity';
import { IPositionsRepository } from './interfaces/positions.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { EntityNotFoundException } from 'src/common/exceptions/custom';

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
    return this.positionsRepository.find();
  }

  //TODO: Refactorizar a que se rompa cuando no existe
  findOneById(id: string): Promise<PositionEntity> {
    return this.positionsRepository.findOne({ where: { id } });
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

    if (!position) {
      throw new EntityNotFoundException('position');
    }

    Object.assign(position, request);

    return this.positionsRepository.save(position);
  }

  deleteById(id: string): Promise<PositionEntity> {
    throw new Error('Method not implemented.');
  }
}
