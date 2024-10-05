import { BaseEntity } from 'src/common/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'areas' })
export class AreaEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'area_id',
  })
  areaId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;
}
