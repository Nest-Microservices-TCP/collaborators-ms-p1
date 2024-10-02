import { Module } from '@nestjs/common';
import { PositionsController } from './positions.controller';
import { PositionsRepository } from './repository/positions.repository';
import { PositionsService } from './positions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionEntity } from './entity/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PositionEntity])],
  controllers: [PositionsController],
  providers: [PositionsRepository, PositionsService],
})
export class PositionsModule {}
