import { Controller } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreaResponseDto } from './dto/response';
import { CreateAreaDto, UpdateAreaDto } from './dto/request';
import { MessagePattern, Payload } from '@nestjs/microservices';

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

  @MessagePattern({ cmd: 'delete.area.by.id' })
  async deleteById(
    @Payload('areaId') areaId: string,
  ): Promise<AreaResponseDto> {
    return this.areasService.deleteById(areaId);
  }

  @MessagePattern({ cmd: 'find.areas.by.ids' })
  async findByIds(@Payload() areasIds: string[]): Promise<AreaResponseDto[]> {
    return this.areasService.findByIds(areasIds);
  }
}
