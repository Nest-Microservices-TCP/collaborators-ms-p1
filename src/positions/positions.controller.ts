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
  async findAll(): Promise<PositionResponseDto[]> {
    return this.positionsService.findAll();
  }

  @MessagePattern('collaborators.find.one.position')
  async findOne(
    @Payload('positionId') positionId: string,
  ): Promise<PositionResponseDto> {
    return this.positionsService.findOne(positionId);
  }

  @MessagePattern('collaborators.find.positions.by.ids')
  async findByIds(
    @Payload('positionsIds') positionsIds: string[],
  ): Promise<PositionResponseDto[]> {
    return this.positionsService.findByIds(positionsIds);
  }

  @MessagePattern('collaborators.save.position')
  async save(
    @Payload() request: CreatePositionDto,
  ): Promise<PositionResponseDto> {
    return this.positionsService.save(request);
  }

  @MessagePattern('collaborators.update.position')
  async update(
    @Payload() request: UpdatePositionDto,
  ): Promise<PositionResponseDto> {
    return this.positionsService.update(request);
  }

  @MessagePattern('collaborators.remove.position')
  async remove(
    @Payload('positionId') positionId: string,
  ): Promise<DeleteResultResponse> {
    return this.positionsService.remove(positionId);
  }
}
