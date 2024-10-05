import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaEntity } from './entity/area.entity';
import { AreasController } from './areas.controller';
import { AreasRepository } from './repository/areas.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AreaEntity])],
  controllers: [AreasController],
  providers: [AreasService, AreasRepository],
})
export class AreasModule {}
