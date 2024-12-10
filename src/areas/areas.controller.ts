import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateAreaDto, UpdateAreaDto } from './dto/request';
import { AreaResponseDto } from './dto/response';
import { AreasService } from './areas.service';
import { Controller } from '@nestjs/common';

@Controller()
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @MessagePattern({ cmd: 'save.area' })
  async save(@Payload() request: CreateAreaDto): Promise<AreaResponseDto> {
    return this.areasService.save(request);
  }

  @MessagePattern({ cmd: 'find.all.areas' })
  async findAll(): Promise<AreaResponseDto[]> {
    return this.areasService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.area.by.id' })
  async findOneById(
    @Payload('areaId') areaId: string,
  ): Promise<AreaResponseDto> {
    return this.areasService.findOneById(areaId);
  }

  @MessagePattern({ cmd: 'update.area' })
  async update(@Payload() request: UpdateAreaDto): Promise<AreaResponseDto> {
    return this.areasService.update(request);
  }

  @MessagePattern({ cmd: 'remove.area.by.id' })
  async remove(
    @Payload('areaId') areaId: string,
  ): Promise<DeleteResultResponse> {
    return this.areasService.remove(areaId);
  }

  @MessagePattern({ cmd: 'find.areas.by.ids' })
  async findByIds(
    @Payload('areasIds') areasIds: string[],
  ): Promise<AreaResponseDto[]> {
    return this.areasService.findByIds(areasIds);
  }
}
