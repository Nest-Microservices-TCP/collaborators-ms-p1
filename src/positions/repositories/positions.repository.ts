/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryRunner } from 'typeorm';
import { CreatePositionDto, UpdatePositionDto } from '../dto';
import { PositionEntity } from '../entities/position.entity';
import { IPositionsRepository } from './interfaces/positions.repository.interface';

export class PositionsRepository implements IPositionsRepository {
  setQueryRunner(queryRunner: QueryRunner): void {
    throw new Error('Method not implemented.');
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
