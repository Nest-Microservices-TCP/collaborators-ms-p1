import { QueryRunner } from 'typeorm';
import { DeleteResultResponse } from '../dto/response';

export interface IBaseRepository<T, CreateDto, UpdateDto> {
  setQueryRunner(queryRunner: QueryRunner): void;
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  create(request: Partial<T>): T;
  save(request: CreateDto): Promise<T>;
  update(request: UpdateDto): Promise<T>;
  remove(id: string): Promise<DeleteResultResponse>;
}
