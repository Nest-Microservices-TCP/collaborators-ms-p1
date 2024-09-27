/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryRunner, Repository, UpdateResult } from 'typeorm';
import { CreateWorkShiftDto, UpdateWorkShiftDto } from '../dto/request';
import { WorkShiftEntity } from '../entities/work-shift.entity';
import { IWorkShiftsRepository } from './interfaces/work-shifts.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';
import { EntityNotFoundException } from 'src/common/exceptions/custom';
import { InternalServerErrorException } from '@nestjs/common';

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
    //TODO: En lugar de validar duplicados, definir restricciones unique en la entidad
    return this.workShiftsRepository.save(request);
  }

  async update(request: UpdateWorkShiftDto): Promise<WorkShiftEntity> {
    const { workShiftId } = request;

    const workShift = await this.findOneById(workShiftId);

    Object.assign(workShift, request);

    return this.workShiftsRepository.save(workShift);
  }

  async deleteById(id: string): Promise<WorkShiftEntity> {
    const workShift = await this.findOneById(id);

    const result: UpdateResult = await this.workShiftsRepository.update(
      workShift.id,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result.affected !== 1) {
      throw new InternalServerErrorException(
        'Error to delete workShift, try again',
      );
    }

    return this.findOneById(id);
  }
}
