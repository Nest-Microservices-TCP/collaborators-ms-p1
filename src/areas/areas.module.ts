import { AreasRepository } from './repository/areas.repository';
import { AreasController } from './areas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreasService } from './areas.service';
import { Area } from './entity/area.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Area])],
  controllers: [AreasController],
  providers: [AreasService, AreasRepository],
})
export class AreasModule {}
