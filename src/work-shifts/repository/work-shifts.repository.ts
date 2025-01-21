import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityNotFoundException,
  FailedRemoveException,
  FailedRestoreException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';
import {
  DeleteResult,
  FindOptionsWhere,
  In,
  QueryRunner,
  Repository,
  UpdateResult,
} from 'typeorm';

import { Status } from 'src/common/enums';
import { WorkShift } from '../entity/work-shift.entity';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateWorkShiftDto } from '../dto/request';

import { IWorkShiftsRepository } from './interfaces/work-shifts.repository.interface';

export class WorkShiftsRepository implements IWorkShiftsRepository {
  private workShiftsRepository: Repository<WorkShift>;

  constructor(
    @InjectRepository(WorkShift)
    private readonly defaultRepository: Repository<WorkShift>,
  ) {
    this.workShiftsRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.workShiftsRepository = queryRunner.manager.getRepository(WorkShift);
    } else {
      this.workShiftsRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<WorkShift[]> {
    return this.workShiftsRepository.find({
      where: { status: Status.ACTIVE },
    });
  }

  async findOne(workShiftId: string): Promise<WorkShift> {
    const workShift = await this.workShiftsRepository.findOne({
      where: { workShiftId },
    });

    if (!workShift) {
      throw new EntityNotFoundException('work-shift');
    }

    return workShift;
  }

  create(request: Partial<WorkShift>): WorkShift {
    return this.workShiftsRepository.create(request);
  }

  save(request: CreateWorkShiftDto): Promise<WorkShift> {
    return this.workShiftsRepository.save(request);
  }

  async update(
    conditions: FindOptionsWhere<WorkShift>,
    request: Partial<WorkShift>,
  ): Promise<WorkShift> {
    const workShift = await this.findByCriteria(conditions);

    Object.assign(workShift, request);

    return this.workShiftsRepository.save(workShift);
  }

  async remove(workShiftId: string): Promise<DeleteResultResponse> {
    const workShift = await this.findOne(workShiftId);

    const result: DeleteResult = await this.workShiftsRepository.delete(
      workShift.workShiftId,
    );

    if (result?.affected === 0) {
      throw new FailedRemoveException('work-shift');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(workShiftsIds: string[]): Promise<WorkShift[]> {
    return this.workShiftsRepository.find({
      where: {
        workShiftId: In(workShiftsIds),
      },
    });
  }

  async findByCriteria(
    criteria: FindOptionsWhere<WorkShift>,
  ): Promise<WorkShift> {
    const workShift = await this.workShiftsRepository.findOne({
      where: criteria,
    });

    if (!workShift) {
      throw new EntityNotFoundException('work-shift');
    }

    return workShift;
  }

  findWithRelations(relations: string[]): Promise<WorkShift[]> {
    return this.workShiftsRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<WorkShift>): Promise<number> {
    return this.workShiftsRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[WorkShift[], number]> {
    return this.workShiftsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async exists(criteria: FindOptionsWhere<WorkShift>): Promise<boolean> {
    const count = await this.workShiftsRepository.count({ where: criteria });

    return count > 0;
  }

  async softDelete(workShiftId: string): Promise<WorkShift> {
    await this.findOne(workShiftId);

    const result: UpdateResult = await this.workShiftsRepository.update(
      workShiftId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result?.affected === 0) {
      throw new FailedSoftDeleteException('work-shift');
    }

    return this.findOne(workShiftId);
  }

  async restore(workShiftId: string): Promise<WorkShift> {
    await this.findOne(workShiftId);

    const result: UpdateResult = await this.workShiftsRepository.update(
      workShiftId,
      {
        status: Status.ACTIVE,
        deletedAt: null,
      },
    );

    if (result?.affected === 0) {
      throw new FailedRestoreException('work-shift');
    }

    return this.findOne(workShiftId);
  }

  bulkSave(workShifts: WorkShift[]): Promise<WorkShift[]> {
    return this.workShiftsRepository.save(workShifts);
  }

  bulkUpdate(workShifts: WorkShift[]): Promise<WorkShift[]> {
    return this.workShiftsRepository.save(workShifts);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.workShiftsRepository.query(query, params);
  }
}
