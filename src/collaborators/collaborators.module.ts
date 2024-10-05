import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorEntity } from './entity/collaborator.entity';
import { CollaboratorsController } from './collaborators.controller';
import { CollaboratorsRepository } from './repository/collaborators.repository';
@Module({
  imports: [TypeOrmModule.forFeature([CollaboratorEntity])],
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService, CollaboratorsRepository],
})
export class CollaboratorsModule {}
