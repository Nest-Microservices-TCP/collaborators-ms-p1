import { Module } from '@nestjs/common';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaEntity } from './entities/area.entity';
import { UnitOfWork } from 'src/common/unit-of-work/unit-of-work.service';

@Module({
  imports: [TypeOrmModule.forFeature([AreaEntity])],
  controllers: [AreasController],
  providers: [AreasService, UnitOfWork],
})
export class AreasModule {}
