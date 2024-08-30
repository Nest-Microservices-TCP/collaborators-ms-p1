import { QueryRunner } from 'typeorm';

export interface IBaseRepository<T, CreateDto, UpdateDto> {
  setQueryRunner(queryRunner: QueryRunner): void;
  findAll(): Promise<T[]>;
  findOneById(id: string): Promise<T>;
  create(request: Partial<T>): T;
  save(request: CreateDto): Promise<T>;
  update(request: UpdateDto): Promise<T>;
  deleteById(id: string): Promise<T>;
}
