import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAreaDto } from './dto';
import { Controller } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreaEntity } from './entities/area.entity';

@Controller()
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @MessagePattern({ cmd: 'save.area' })
  async save(@Payload() request: CreateAreaDto): Promise<AreaEntity> {
    return this.areasService.save(request);
  }

  async findAll(): Promise<AreaEntity[]> {
    return this.areasService.findAll();
  }
}
