import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAreaDto } from './dto';
import { Controller } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreaEntity } from './entities/area.entity';
import { UpdateAreaDto } from './dto/update-area.dto';

@Controller()
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @MessagePattern({ cmd: 'save.area' })
  async save(@Payload() request: CreateAreaDto): Promise<AreaEntity> {
    return this.areasService.save(request);
  }

  @MessagePattern({ cmd: 'find.all.areas' })
  async findAll(): Promise<AreaEntity[]> {
    return this.areasService.findAll();
  }

  @MessagePattern({ cmd: 'find-one-area-by-id' })
  async findOneById(id: string): Promise<AreaEntity> {
    return this.areasService.findOneById(id);
  }

  async update(request: UpdateAreaDto): Promise<AreaEntity> {
    return this.areasService.update(request);
  }

  @MessagePattern({ cmd: 'delete.area.by.id' })
  async deleteById(id: string): Promise<AreaEntity> {
    return this.areasService.deleteById(id);
  }
}
