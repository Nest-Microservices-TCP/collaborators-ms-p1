import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Position as IPosition } from 'src/grpc/proto/collaborators/positions.pb';
import { BaseEntity } from 'src/common/entity';

@Entity({ name: 'positions' })
export class Position extends BaseEntity implements IPosition {
  @PrimaryGeneratedColumn('uuid', {
    name: 'position_id',
  })
  position_id: string;

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
