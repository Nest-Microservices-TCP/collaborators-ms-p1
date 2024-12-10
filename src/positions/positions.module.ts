import { PositionsRepository } from './repository/positions.repository';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';
import { Position } from './entity/position.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  controllers: [PositionsController],
  providers: [PositionsRepository, PositionsService],
})
export class PositionsModule {}
