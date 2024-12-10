import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/common/entity';

@Entity({ name: 'areas' })
export class Area extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'area_id',
  })
  areaId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;
}
