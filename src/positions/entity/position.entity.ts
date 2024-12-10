import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/common/entity';

@Entity({ name: 'positions' })
export class Position extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'position_id',
  })
  positionId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string;
}
