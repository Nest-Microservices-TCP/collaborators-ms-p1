import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Collaborator } from './entity/collaborator.entity';

import { CollaboratorsController } from './collaborators.controller';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsRepository } from './repository/collaborators.repository';
@Module({
  imports: [TypeOrmModule.forFeature([Collaborator])],
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService, CollaboratorsRepository],
})
export class CollaboratorsModule {}
