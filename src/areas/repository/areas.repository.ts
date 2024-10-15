import {
  FailedDeleteException,
  EntityNotFoundException,
} from 'src/common/exceptions/custom';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaEntity } from '../entity/area.entity';
import { ConflictException } from '@nestjs/common';
import { Status } from 'src/common/enums/status.enum';
import { CreateAreaDto, UpdateAreaDto } from '../dto/request';
import { QueryRunner, Repository, UpdateResult } from 'typeorm';
import { IAreasRepository } from './interfaces/areas.repository.interface';

export class AreasRepository implements IAreasRepository {
  private areasRepository: Repository<AreaEntity>;

  constructor(
    @InjectRepository(AreaEntity)
    private readonly defaultRepository: Repository<AreaEntity>,
  ) {
    this.areasRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner) {
    if (queryRunner) {
      this.areasRepository = queryRunner.manager.getRepository(AreaEntity);
    } else {
      this.areasRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<AreaEntity[]> {
    return this.areasRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOneById(areaId: string): Promise<AreaEntity> {
    const area = await this.areasRepository.findOne({
      where: { areaId },
    });

    if (!area) {
      throw new EntityNotFoundException('area');
    }

    return area;
  }

  create(request: Partial<AreaEntity>): AreaEntity {
    return this.areasRepository.create(request);
  }

  async save(request: CreateAreaDto): Promise<AreaEntity> {
    //TODO: Do not handle the duplicates because this properties was marked as unique
    const { name } = request;

    const area = await this.areasRepository.findOne({
      where: { name },
    });

    if (area) {
      throw new ConflictException(
        `The area with name: '${name}' already exists`,
      );
    }

    return this.areasRepository.save(request);
  }

  async update(request: UpdateAreaDto): Promise<AreaEntity> {
    const { areaId } = request;

    const area = await this.findOneById(areaId);

    Object.assign(area, request);

    return this.areasRepository.save(area);
  }

  async deleteById(areaId: string): Promise<AreaEntity> {
    const area = await this.findOneById(areaId);

    const result: UpdateResult = await this.areasRepository.update(
      area.areaId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result.affected !== 1) {
      throw new FailedDeleteException('area');
    }

    return this.findOneById(area.areaId);
  }
}
