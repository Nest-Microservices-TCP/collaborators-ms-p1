import { IAreasRepository } from './interfaces/areas.repository.interface';
import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateAreaDto } from '../dto/request';
import { Status } from 'src/common/enums/status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from '../entity/area.entity';
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
  private areasRepository: Repository<Area>;

  constructor(
    @InjectRepository(Area)
    private readonly defaultRepository: Repository<Area>,
  ) {
    this.areasRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner) {
    if (queryRunner) {
      this.areasRepository = queryRunner.manager.getRepository(Area);
    } else {
      this.areasRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<Area[]> {
    return this.areasRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOne(areaId: string): Promise<Area> {
    const area = await this.areasRepository.findOne({
      where: { areaId },
    });

    if (!area) {
      throw new EntityNotFoundException('area');
    }

    return area;
  }

  create(request: Partial<Area>): Area {
    return this.areasRepository.create(request);
  }

  async save(request: CreateAreaDto): Promise<Area> {
    return this.areasRepository.save(request);
  }

  async update(
    conditions: FindOptionsWhere<Area>,
    request: Partial<Area>,
  ): Promise<Area> {
    const area = await this.findByCriteria(conditions);

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

  findByIds(areasIds: string[]): Promise<Area[]> {
    return this.areasRepository.find({
      where: {
        areaId: In(areasIds),
      },
    });
  }

  async findByCriteria(criteria: FindOptionsWhere<Area>): Promise<Area> {
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

  findWithRelations(relations: string[]): Promise<Area[]> {
    return this.areasRepository.find({
      relations, // { relations: ['employees'] }
    });
  }

  count(criteria: FindOptionsWhere<Area>): Promise<number> {
    return this.areasRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[Area[], number]> {
    return this.areasRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async softDelete(areaId: string): Promise<Area> {
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

  async restore(areaId: string): Promise<Area> {
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

  async exists(criteria: FindOptionsWhere<Area>): Promise<boolean> {
    const count = await this.areasRepository.count({ where: criteria });

    return count > 0;
  }

  bulkSave(entities: Area[]): Promise<Area[]> {
    return this.areasRepository.save(entities);
  }

  bulkUpdate(entities: Area[]): Promise<Area[]> {
    return this.areasRepository.save(entities);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.areasRepository.query(query, params);
  }
}
