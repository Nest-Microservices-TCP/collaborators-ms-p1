import { Controller } from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto';
import { AreaEntity } from './entities/area.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @MessagePattern({ cmd: 'save.area' })
  async save(request: CreateAreaDto): Promise<AreaEntity> {
    return this.areasService.save(request);
  }
}
