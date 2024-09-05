import { Injectable } from '@nestjs/common';
import { PositionsRepository } from './repositories/positions.repository';

@Injectable()
export class PositionsService {
  constructor(private readonly positionsRepository: PositionsRepository) {}
}
