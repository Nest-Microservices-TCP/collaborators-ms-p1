import { Module } from '@nestjs/common';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreasRepository } from './repository/areas.repository';
import { AreaEntity } from './entity/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreaEntity])],
  controllers: [AreasController],
  providers: [AreasService, AreasRepository],
})
export class AreasModule {}
