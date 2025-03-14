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

import { IAreasRepository } from './interfaces/areas.repository.interface';

import {
  CreateAreaRequest,
  FindOneAreaRequest,
} from 'src/grpc/proto/collaborators/areas.pb';

import { Status } from 'src/common/enums/status.enum';
import { Area } from '../entity/area.entity';

import { DeleteResultResponse } from 'src/common/dto/response';

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

  find(): Promise<Area[]> {
    return this.areasRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOne(request: FindOneAreaRequest): Promise<Area> {
    const { area_id } = request;

    const area = await this.areasRepository.findOne({
      where: { area_id },
    });

    if (!area) {
      throw new EntityNotFoundException('area');
    }

    return area;
  }

  create(request: Partial<Area>): Area {
    return this.areasRepository.create(request);
  }

  async save(request: CreateAreaRequest): Promise<Area> {
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

  async remove(area_id: string): Promise<DeleteResultResponse> {
    await this.findOne({ area_id });

    const result: DeleteResult = await this.areasRepository.delete(area_id);

    if (result?.affected === 0) {
      throw new FailedRemoveException('area');
    }

    return {
      deleted: true,
      affected: result.affected,
    };
  }

  findByIds(areas_ids: string[]): Promise<Area[]> {
    return this.areasRepository.find({
      where: {
        area_id: In(areas_ids),
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

  async softDelete(area_id: string): Promise<Area> {
    const area = await this.findOne({ area_id });

    const result: UpdateResult = await this.areasRepository.update(
      area.area_id,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result.affected !== 1) {
      throw new FailedSoftDeleteException('area');
    }

    return this.findOne({ area_id: area.area_id });
  }

  async restore(area_id: string): Promise<Area> {
    const area = await this.findOne({ area_id });

    const result: UpdateResult = await this.areasRepository.update(
      area?.area_id,
      {
        status: Status.ACTIVE,
        deletedAt: null,
      },
    );

    if (result?.affected === 0) {
      throw new FailedRestoreException('area');
    }

    return this.findOne({ area_id });
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
