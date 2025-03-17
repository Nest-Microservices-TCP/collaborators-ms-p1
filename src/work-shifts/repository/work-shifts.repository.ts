import {
  In,
  Repository,
  QueryRunner,
  DeleteResult,
  UpdateResult,
  FindOptionsWhere,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  FailedRemoveException,
  FailedRestoreException,
  EntityNotFoundException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

import {
  CreateWorkShiftRequest,
  FindOneWorkShiftRequest,
} from 'src/grpc/proto/collaborators/work_shifts.pb';

import { IWorkShiftsRepository } from './interfaces/work-shifts.repository.interface';

import { Status } from 'src/common/enums';
import { WorkShift } from '../entity/work-shift.entity';

import { DeleteResultResponse } from 'src/common/dto/response';

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

  find(): Promise<WorkShift[]> {
    return this.workShiftsRepository.find({
      where: { status: Status.ACTIVE },
    });
  }

  async findOne(request: FindOneWorkShiftRequest): Promise<WorkShift> {
    const { work_shift_id } = request;

    const workShift = await this.workShiftsRepository.findOne({
      where: { work_shift_id },
    });

    if (!workShift) {
      throw new EntityNotFoundException('work-shift');
    }

    return workShift;
  }

  create(request: Partial<WorkShift>): WorkShift {
    return this.workShiftsRepository.create(request);
  }

  save(request: CreateWorkShiftRequest): Promise<WorkShift> {
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

  async remove(work_shift_id: string): Promise<DeleteResultResponse> {
    const workShift = await this.findOne({ work_shift_id });

    const result: DeleteResult = await this.workShiftsRepository.delete(
      workShift.work_shift_id,
    );

    if (result?.affected === 0) {
      throw new FailedRemoveException('work-shift');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(workShiftsIds: string[]): Promise<WorkShift[]> {
    return this.workShiftsRepository.find({
      where: {
        work_shift_id: In(workShiftsIds),
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

  async softDelete(work_shift_id: string): Promise<WorkShift> {
    await this.findOne({ work_shift_id });

    const result: UpdateResult = await this.workShiftsRepository.update(
      work_shift_id,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result?.affected === 0) {
      throw new FailedSoftDeleteException('work-shift');
    }

    return this.findOne({ work_shift_id });
  }

  async restore(work_shift_id: string): Promise<WorkShift> {
    await this.findOne({ work_shift_id });

    const result: UpdateResult = await this.workShiftsRepository.update(
      work_shift_id,
      {
        status: Status.ACTIVE,
        deletedAt: null,
      },
    );

    if (result?.affected === 0) {
      throw new FailedRestoreException('work-shift');
    }

    return this.findOne({ work_shift_id });
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
