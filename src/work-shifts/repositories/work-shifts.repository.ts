/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryRunner, Repository } from 'typeorm';
import { CreateWorkShiftDto, UpdateWorkShiftDto } from '../dto/request';
import { WorkShiftEntity } from '../entities/work-shift.entity';
import { IWorkShiftsRepository } from './interfaces/work-shifts.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';

export class WorkShiftsRepository implements IWorkShiftsRepository {
  private workShiftsRepository: Repository<WorkShiftEntity>;

  constructor(
    @InjectRepository(WorkShiftEntity)
    private readonly defaultRepository: Repository<WorkShiftEntity>,
  ) {
    this.workShiftsRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.workShiftsRepository =
        queryRunner.manager.getRepository(WorkShiftEntity);
    } else {
      this.workShiftsRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<WorkShiftEntity[]> {
    return this.workShiftsRepository.find({
      where: { status: Status.ACTIVE },
    });
  }

  findOneById(id: string): Promise<WorkShiftEntity> {
    throw new Error('Method not implemented.');
  }

  create(request: Partial<WorkShiftEntity>): WorkShiftEntity {
    throw new Error('Method not implemented.');
  }

  save(request: CreateWorkShiftDto): Promise<WorkShiftEntity> {
    throw new Error('Method not implemented.');
  }

  update(request: UpdateWorkShiftDto): Promise<WorkShiftEntity> {
    throw new Error('Method not implemented.');
  }

  deleteById(id: string): Promise<WorkShiftEntity> {
    throw new Error('Method not implemented.');
  }
}
