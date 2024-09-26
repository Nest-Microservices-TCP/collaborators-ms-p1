/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryRunner, Repository } from 'typeorm';
import { CreateWorkShiftDto, UpdateWorkShiftDto } from '../dto/request';
import { WorkShiftEntity } from '../entities/work-shift.entity';
import { IWorkShiftsRepository } from './interfaces/work-shifts.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';
import { EntityNotFoundException } from 'src/common/exceptions/custom';

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

  async findOneById(id: string): Promise<WorkShiftEntity> {
    const workShift = await this.workShiftsRepository.findOne({
      where: { id },
    });

    if (!workShift) {
      throw new EntityNotFoundException('work-shift');
    }

    return workShift;
  }

  create(request: Partial<WorkShiftEntity>): WorkShiftEntity {
    return this.workShiftsRepository.create(request);
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
