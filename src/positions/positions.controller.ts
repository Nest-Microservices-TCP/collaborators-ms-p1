import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreatePositionDto, UpdatePositionDto } from './dto/request';
import { PositionResponseDto } from './dto/response';

import { PositionsService } from './positions.service';

@Controller()
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @MessagePattern('collaborators.find.all.positions')
  findAll(): Promise<PositionResponseDto[]> {
    return this.positionsService.findAll();
  }

  @MessagePattern('collaborators.find.one.position')
  findOne(
    @Payload('positionId') positionId: string,
  ): Promise<PositionResponseDto> {
    return this.positionsService.findOne(positionId);
  }

  @MessagePattern('collaborators.find.positions.by.ids')
  findByIds(
    @Payload('positionsIds') positionsIds: string[],
  ): Promise<PositionResponseDto[]> {
    return this.positionsService.findByIds(positionsIds);
  }

  @MessagePattern('collaborators.save.position')
  save(@Payload() request: CreatePositionDto): Promise<PositionResponseDto> {
    return this.positionsService.save(request);
  }

  @MessagePattern('collaborators.update.position')
  update(@Payload() request: UpdatePositionDto): Promise<PositionResponseDto> {
    return this.positionsService.update(request);
  }

  @MessagePattern('collaborators.remove.position')
  remove(
    @Payload('positionId') positionId: string,
  ): Promise<DeleteResultResponse> {
    return this.positionsService.remove(positionId);
  }
}
