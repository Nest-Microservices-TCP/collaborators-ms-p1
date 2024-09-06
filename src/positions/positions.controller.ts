import { Controller } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionEntity } from './entities/position.entity';
import { CreatePositionDto } from './dto';

@Controller()
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  findAll(): Promise<PositionEntity[]> {
    return this.positionsService.findAll();
  }

  findOneById(id: string): Promise<PositionEntity> {
    return this.positionsService.findOneById(id);
  }

  save(request: CreatePositionDto): Promise<PositionEntity> {
    return this.positionsService.save(request);
  }
}
