import { Module } from '@nestjs/common';
import { CollaboratorsController } from './collaborators.controller';
import { CollaboratorsService } from './collaborators.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaboratorEntity } from './entities/collaborator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CollaboratorEntity])],
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService],
})
export class CollaboratorsModule {}
