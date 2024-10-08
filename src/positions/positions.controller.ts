import { Controller } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto, UpdatePositionDto } from './dto/request';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PositionResponseDto } from './dto/response';

@Controller()
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @MessagePattern({ cmd: 'find.all.positions' })
  findAll(): Promise<PositionResponseDto[]> {
    return this.positionsService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.position.by.id' })
  findOneById(
    @Payload('positionId') positionId: string,
  ): Promise<PositionResponseDto> {
    return this.positionsService.findOneById(positionId);
  }

  @MessagePattern({ cmd: 'save.position' })
  save(@Payload() request: CreatePositionDto): Promise<PositionResponseDto> {
    return this.positionsService.save(request);
  }

  @MessagePattern({ cmd: 'update.position' })
  update(@Payload() request: UpdatePositionDto): Promise<PositionResponseDto> {
    return this.positionsService.update(request);
  }

  @MessagePattern({ cmd: 'delete.position.by.id' })
  deleteById(
    @Payload('positionId') positionId: string,
  ): Promise<PositionResponseDto> {
    return this.positionsService.deleteById(positionId);
  }
}
