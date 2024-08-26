import { HttpStatus, Injectable } from '@nestjs/common';
import { UnitOfWork } from 'src/common/unit-of-work/unit-of-work.service';
import { AreaEntity } from './entities/area.entity';
import { CreateAreaDto } from './dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AreasService {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async save(request: CreateAreaDto): Promise<AreaEntity> {
    let newArea: AreaEntity;

    try {
      await this.unitOfWork.start();

      await this.unitOfWork.complete(async () => {
        const areasRepository = this.unitOfWork.getAreasRepository();

        newArea = await areasRepository.save(request);
      });

      return newArea;
    } catch (error) {
      throw new RpcException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error to save the area: ${error}`,
      });
    }
  }
}
