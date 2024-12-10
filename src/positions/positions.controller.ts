import { CreatePositionDto, UpdatePositionDto } from './dto/request';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeleteResultResponse } from 'src/common/dto/response';
import { PositionsService } from './positions.service';
import { PositionResponseDto } from './dto/response';
import { Controller } from '@nestjs/common';

@Controller()
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @MessagePattern({ cmd: 'find.all.positions' })
  findAll(): Promise<PositionResponseDto[]> {
    return this.positionsService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.position' })
  findOne(
    @Payload('positionId') positionId: string,
  ): Promise<PositionResponseDto> {
    return this.positionsService.findOne(positionId);
  }

  @MessagePattern({ cmd: 'find.positions.by.ids' })
  findByIds(
    @Payload('positionsIds') positionsIds: string[],
  ): Promise<PositionResponseDto[]> {
    return this.positionsService.findByIds(positionsIds);
  }

  @MessagePattern({ cmd: 'save.position' })
  save(@Payload() request: CreatePositionDto): Promise<PositionResponseDto> {
    return this.positionsService.save(request);
  }

  @MessagePattern({ cmd: 'update.position' })
  update(@Payload() request: UpdatePositionDto): Promise<PositionResponseDto> {
    return this.positionsService.update(request);
  }

  @MessagePattern({ cmd: 'remove.position.by.id' })
  remove(
    @Payload('positionId') positionId: string,
  ): Promise<DeleteResultResponse> {
    return this.positionsService.remove(positionId);
  }
}
