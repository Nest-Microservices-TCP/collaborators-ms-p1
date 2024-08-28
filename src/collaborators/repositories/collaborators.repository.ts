import { QueryRunner, Repository } from 'typeorm';
import { CreateCollaboratorDto } from '../dto/create-collaborator.dto';
import { CollaboratorEntity } from '../entities/collaborator.entity';
import { ICollaboratorsRepository } from './interfaces/collaborators.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

export class CollaboratorsRepository implements ICollaboratorsRepository {
  private collaboratorsRepository: Repository<CollaboratorEntity>;

  constructor(
    @InjectRepository(CollaboratorEntity)
    private readonly defaultRepository: Repository<CollaboratorEntity>,
  ) {
    this.collaboratorsRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.collaboratorsRepository =
        queryRunner.manager.getRepository(CollaboratorEntity);
    } else {
      this.collaboratorsRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<CollaboratorEntity[]> {
    return this.collaboratorsRepository.find();
  }

  findOneById(id: string): Promise<CollaboratorEntity> {
    return this.collaboratorsRepository.findOne({ where: { id } });
  }

  create(request: Partial<CollaboratorEntity>): CollaboratorEntity {
    return this.collaboratorsRepository.create(request);
  }

  save(request: CreateCollaboratorDto): Promise<CollaboratorEntity> {
    return this.collaboratorsRepository.save(request);
  }

  async deletedById(id: string): Promise<CollaboratorEntity> {
    const collaborator = await this.findOneById(id);

    await this.collaboratorsRepository.delete(id);

    return collaborator;
  }
}
