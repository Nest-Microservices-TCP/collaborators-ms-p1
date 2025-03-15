import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';
import { AreasRepository } from './repository/areas.repository';

import { Area } from './entity/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Area])],
  controllers: [AreasController],
  providers: [AreasService, AreasRepository],
})
export class AreasModule {}
