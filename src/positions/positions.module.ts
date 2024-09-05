import { Module } from '@nestjs/common';
import { PositionsController } from './positions.controller';
import { PositionsRepository } from './repositories/positions.repository';
import { PositionsService } from './positions.service';

@Module({
  controllers: [PositionsController],
  providers: [PositionsRepository, PositionsService],
})
export class PositionsModule {}
