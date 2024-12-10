import { IAreasRepository } from './interfaces/areas.repository.interface';
import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateAreaDto, UpdateAreaDto } from '../dto/request';
import { Status } from 'src/common/enums/status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaEntity } from '../entity/area.entity';
import {
  In,
  Repository,
  QueryRunner,
  UpdateResult,
  DeleteResult,
  FindOptionsWhere,
} from 'typeorm';
import {
  FailedRemoveException,
  FailedRestoreException,
  EntityNotFoundException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

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

  async findOne(areaId: string): Promise<AreaEntity> {
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
    return this.areasRepository.save(request);
  }

  async update(request: UpdateAreaDto): Promise<AreaEntity> {
    const { areaId } = request;

    const area = await this.findOne(areaId);

    Object.assign(area, request);

    return this.areasRepository.save(area);
  }

  async remove(areaId: string): Promise<DeleteResultResponse> {
    await this.findOne(areaId);

    const result: DeleteResult = await this.areasRepository.delete(areaId);

    if (result?.affected === 0) {
      throw new FailedRemoveException('area');
    }

    return {
      deleted: true,
      affected: result.affected,
    };
  }

  findByIds(areasIds: string[]): Promise<AreaEntity[]> {
    return this.areasRepository.find({
      where: {
        areaId: In(areasIds),
      },
    });
  }

  async findByCriteria(
    criteria: FindOptionsWhere<AreaEntity>,
  ): Promise<AreaEntity> {
    const area = await this.areasRepository.findOne({ where: criteria });

    if (!area) {
      throw new EntityNotFoundException('area');
    }

    return area;
  }

  //TODO: Probar con tipado de keyof si nos da auto-completado
  // async findWithRelations(relations: (keyof AreaEntity)[]): Promise<AreaEntity[]> {
  //   return this.areasRepository.find({
  //     relations: relations as string[],
  //   });
  // }

  findWithRelations(relations: string[]): Promise<AreaEntity[]> {
    return this.areasRepository.find({
      relations, // { relations: ['employees'] }
    });
  }

  count(criteria: FindOptionsWhere<AreaEntity>): Promise<number> {
    return this.areasRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[AreaEntity[], number]> {
    return this.areasRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async softDelete(areaId: string): Promise<AreaEntity> {
    const area = await this.findOne(areaId);

    const result: UpdateResult = await this.areasRepository.update(
      area.areaId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result.affected !== 1) {
      throw new FailedSoftDeleteException('area');
    }

    return this.findOne(area.areaId);
  }

  async restore(areaId: string): Promise<AreaEntity> {
    const area = await this.findOne(areaId);

    const result: UpdateResult = await this.areasRepository.update(
      area?.areaId,
      {
        status: Status.ACTIVE,
        deletedAt: null,
      },
    );

    if (result?.affected === 0) {
      throw new FailedRestoreException('area');
    }

    return this.findOne(areaId);
  }

  async exists(criteria: FindOptionsWhere<AreaEntity>): Promise<boolean> {
    const count = await this.areasRepository.count({ where: criteria });

    return count > 0;
  }

  bulkSave(entities: AreaEntity[]): Promise<AreaEntity[]> {
    return this.areasRepository.save(entities);
  }

  bulkUpdate(entities: AreaEntity[]): Promise<AreaEntity[]> {
    return this.areasRepository.save(entities);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.areasRepository.query(query, params);
  }
}
