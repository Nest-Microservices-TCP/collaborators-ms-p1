import { BaseEntity } from 'src/common/entity/BaseEntity';
import { Entity } from 'typeorm';

@Entity({ name: 'positions' })
export class PositionEntity extends BaseEntity {}
