import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { PositionsRepository } from './repository/positions.repository';

import { Position } from './entity/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  controllers: [PositionsController],
  providers: [PositionsRepository, PositionsService],
})
export class PositionsModule {}
