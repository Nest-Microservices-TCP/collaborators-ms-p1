import { Controller } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionEntity } from './entities/position.entity';
import { CreatePositionDto, UpdatePositionDto } from './dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @MessagePattern({ cmd: 'find.all.positions' })
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

  deleteById(id: string): Promise<PositionEntity> {
    return this.positionsService.deleteById(id);
  }
}
