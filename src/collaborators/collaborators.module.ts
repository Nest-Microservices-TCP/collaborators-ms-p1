import { CollaboratorsRepository } from './repository/collaborators.repository';
import { CollaboratorsController } from './collaborators.controller';
import { CollaboratorsService } from './collaborators.service';
import { Collaborator } from './entity/collaborator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
@Module({
  imports: [TypeOrmModule.forFeature([Collaborator])],
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService, CollaboratorsRepository],
})
export class CollaboratorsModule {}
