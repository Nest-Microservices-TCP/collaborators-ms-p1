import { Controller } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionEntity } from './entities/position.entity';
import { CreatePositionDto, UpdatePositionDto } from './dto';

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

  update(request: UpdatePositionDto): Promise<PositionEntity> {
    return this.positionsService.update(request);
  }
}
