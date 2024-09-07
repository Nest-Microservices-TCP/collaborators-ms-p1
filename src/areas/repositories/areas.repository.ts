import { UpdateAreaDto } from '../dto/update-area.dto';
import { QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IAreasRepository } from './interfaces/areas.repository.interface';
import { CreateAreaDto } from '../dto/create-area.dto';
import { AreaEntity } from '../entities/area.entity';

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
    return this.areasRepository.find();
  }

  findOneById(id: string): Promise<AreaEntity> {
    return this.areasRepository.findOne({ where: { id } });
  }

  create(request: Partial<AreaEntity>): AreaEntity {
    return this.areasRepository.create(request);
  }

  save(request: CreateAreaDto): Promise<AreaEntity> {
    return this.areasRepository.save(request);
  }

  async update(request: UpdateAreaDto): Promise<AreaEntity> {
    const { areaId } = request;

    const area = await this.findOneById(areaId);

    Object.assign(area, request);

    return this.areasRepository.save(area);
  }

  async deleteById(id: string): Promise<AreaEntity> {
    const area = await this.findOneById(id);

    await this.areasRepository.delete({ id });

    return area;
  }
}
