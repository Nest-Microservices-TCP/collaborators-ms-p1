import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateAreaDto, UpdateAreaDto } from './dto/request';
import { AreaResponseDto } from './dto/response';

import { AreasService } from './areas.service';

@Controller()
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @MessagePattern('areas.save')
  async save(@Payload() request: CreateAreaDto): Promise<AreaResponseDto> {
    return this.areasService.save(request);
  }

  @MessagePattern('areas.find.all')
  async findAll(): Promise<AreaResponseDto[]> {
    return this.areasService.findAll();
  }

  @MessagePattern('areas.find.one')
  async findOne(@Payload('areaId') areaId: string): Promise<AreaResponseDto> {
    return this.areasService.findOne(areaId);
  }

  @MessagePattern('areas.update')
  async update(@Payload() request: UpdateAreaDto): Promise<AreaResponseDto> {
    return this.areasService.update(request);
  }

  @MessagePattern('areas.remove')
  async remove(
    @Payload('areaId') areaId: string,
  ): Promise<DeleteResultResponse> {
    return this.areasService.remove(areaId);
  }

  @MessagePattern('areas.find.by.ids')
  async findByIds(
    @Payload('areasIds') areasIds: string[],
  ): Promise<AreaResponseDto[]> {
    return this.areasService.findByIds(areasIds);
  }
}
