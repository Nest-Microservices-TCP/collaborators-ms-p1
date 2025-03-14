import { FindOptionsWhere, QueryRunner } from 'typeorm';
import { DeleteResultResponse } from '../dto/response';

export interface IBaseRepository<T, CreateDto, FindOneDto> {
  setQueryRunner(queryRunner: QueryRunner): void;

  find(): Promise<T[]>;
  findOne(request: FindOneDto): Promise<T>;
  create(request: Partial<T>): T;
  save(request: CreateDto): Promise<T>;
  update(conditions: FindOptionsWhere<T>, request: Partial<T>): Promise<T>;
  remove(id: string): Promise<DeleteResultResponse>;
}
