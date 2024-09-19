import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAreaDto, UpdateAreaDto } from './dto/request';
import { Controller } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreaEntity } from './entities/area.entity';
import { AreaResponseDto } from './dto/response/area-response.dto';

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
  async findOneById(@Payload('id') id: string): Promise<AreaResponseDto> {
    return this.areasService.findOneById(id);
  }

  @MessagePattern({ cmd: 'update.area' })
  async update(@Payload() request: UpdateAreaDto): Promise<AreaResponseDto> {
    return this.areasService.update(request);
  }

  @MessagePattern({ cmd: 'delete.area.by.id' })
  async deleteById(@Payload('id') id: string): Promise<AreaEntity> {
    return this.areasService.deleteById(id);
  }
}
