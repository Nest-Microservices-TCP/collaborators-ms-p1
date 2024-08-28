import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { IUnitForWork } from './interfaces/unit-of-work.interface';
import { AreasRepository } from 'src/areas/repositories/areas.repository';
import { CollaboratorsRepository } from 'src/collaborators/repositories/collaborators.repository';

@Injectable()
export class UnitOfWork implements IUnitForWork {
  private queryRunner: QueryRunner;

  constructor(
    private readonly dataSource: DataSource,
    private readonly collaboratorsRepository: CollaboratorsRepository,
    private readonly areasRepository: AreasRepository,
  ) {
    this.queryRunner = this.dataSource.createQueryRunner();
  }

  async start(): Promise<void> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    this.collaboratorsRepository.setQueryRunner(this.queryRunner);
    this.areasRepository.setQueryRunner(this.queryRunner);
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

  getCollaboratorsRepository(): CollaboratorsRepository {
    return this.collaboratorsRepository;
  }
}
