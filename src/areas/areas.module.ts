import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Area } from './entity/area.entity';

import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';
import { AreasRepository } from './repository/areas.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Area])],
  controllers: [AreasController],
  providers: [AreasService, AreasRepository],
})
export class AreasModule {}
