import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Area as IArea } from 'src/grpc/proto/collaborators/areas.pb';
import { BaseEntity } from 'src/common/entity';

@Entity({ name: 'areas' })
export class Area extends BaseEntity implements IArea {
  @PrimaryGeneratedColumn('uuid', {
    name: 'area_id',
  })
  area_id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;
}
