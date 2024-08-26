import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { IUnitForWork } from './interfaces/unit-of-work.interface';
import { AreasRepository } from 'src/areas/repositories/areas.repository';

@Injectable()
export class UnitOfWork implements IUnitForWork {
  private queryRunner: QueryRunner;

  constructor(
    private readonly dataSource: DataSource,
    private readonly areasRepository: AreasRepository,
  ) {
    this.queryRunner = this.dataSource.createQueryRunner();
  }

  async start(): Promise<void> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async complete(work: () => Promise<void>): Promise<void> {
    try {
      await work();
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await this.queryRunner.release();
    }
  }

  getAreasRepository(): AreasRepository {
    return this.areasRepository;
  }
}
