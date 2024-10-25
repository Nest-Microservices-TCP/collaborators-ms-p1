/* eslint-disable @typescript-eslint/no-unused-vars */
import { IWorkShiftsRepository } from './interfaces/work-shifts.repository.interface';
import { CreateWorkShiftDto, UpdateWorkShiftDto } from '../dto/request';
import { WorkShiftEntity } from '../entity/work-shift.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';
import {
  Repository,
  QueryRunner,
  FindOptionsWhere,
  DeleteResult,
  In,
} from 'typeorm';
import {
  FailedRemoveException,
  EntityNotFoundException,
} from 'src/common/exceptions/custom';

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

  async findOneById(workShiftId: string): Promise<WorkShiftEntity> {
    const workShift = await this.workShiftsRepository.findOne({
      where: { workShiftId },
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
    return this.workShiftsRepository.save(request);
  }

  async update(request: UpdateWorkShiftDto): Promise<WorkShiftEntity> {
    const { workShiftId } = request;

    const workShift = await this.findOneById(workShiftId);

    Object.assign(workShift, request);

    return this.workShiftsRepository.save(workShift);
  }

  async remove(workShiftId: string): Promise<WorkShiftEntity> {
    const workShift = await this.findOneById(workShiftId);

    const result: DeleteResult = await this.workShiftsRepository.delete(
      workShift.workShiftId,
    );

    if (result.affected !== 1) {
      throw new FailedRemoveException('work-shift');
    }

    return this.findOneById(workShiftId);
  }

  findByIds(workShiftsIds: string[]): Promise<WorkShiftEntity[]> {
    return this.workShiftsRepository.find({
      where: {
        workShiftId: In(workShiftsIds),
      },
    });
  }

  findByCriteria(
    criteria: FindOptionsWhere<WorkShiftEntity>,
  ): Promise<WorkShiftEntity> {
    return this.workShiftsRepository.findOne({ where: criteria });
  }

  findWithRelations(relations: string[]): Promise<WorkShiftEntity[]> {
    return this.workShiftsRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<WorkShiftEntity>): Promise<number> {
    return this.workShiftsRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[WorkShiftEntity[], number]> {
    return this.workShiftsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async exists(criteria: FindOptionsWhere<WorkShiftEntity>): Promise<boolean> {
    const count = await this.workShiftsRepository.count({ where: criteria });

    return count > 0;
  }

  softDelete(id: string): Promise<WorkShiftEntity> {
    throw new Error('Method not implemented.');
  }
  restore(id: string): Promise<WorkShiftEntity> {
    throw new Error('Method not implemented.');
  }
  bulkSave(entities: WorkShiftEntity[]): Promise<WorkShiftEntity[]> {
    throw new Error('Method not implemented.');
  }
  bulkUpdate(entities: WorkShiftEntity[]): Promise<WorkShiftEntity[]> {
    throw new Error('Method not implemented.');
  }
  customQuery(query: string, params: any[]): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
