import { CreateAreaDto } from 'src/areas/dto/create-area.dto';
import { AreaEntity } from 'src/areas/entities/area.entity';
import { QueryRunner } from 'typeorm';

export interface IAreasRepository {
  setQueryRunner(queryRunner: QueryRunner): void;
  findAll(): Promise<AreaEntity[]>;
  findOneById(id: string): Promise<AreaEntity>;
  create(request: Partial<AreaEntity>): AreaEntity;
  save(request: CreateAreaDto): Promise<AreaEntity>;
  deleteById(id: string): Promise<AreaEntity>;
}
