/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryRunner, Repository } from 'typeorm';
import { CreatePositionDto, UpdatePositionDto } from '../dto';
import { PositionEntity } from '../entities/position.entity';
import { IPositionsRepository } from './interfaces/positions.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

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
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): Promise<PositionEntity> {
    throw new Error('Method not implemented.');
  }
  create(request: Partial<PositionEntity>): PositionEntity {
    throw new Error('Method not implemented.');
  }
  save(request: CreatePositionDto): Promise<PositionEntity> {
    throw new Error('Method not implemented.');
  }
  update(request: UpdatePositionDto): Promise<PositionEntity> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: string): Promise<PositionEntity> {
    throw new Error('Method not implemented.');
  }
}
