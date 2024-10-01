import { BaseEntity } from 'src/common/entity/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'areas' })
export class AreaEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;
}
