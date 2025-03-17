import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { WorkShift as IWorkShift } from 'src/grpc/proto/collaborators/work_shifts.pb';
import { BaseEntity } from 'src/common/entity';

@Entity({ name: 'work_shifts' })
export class WorkShift extends BaseEntity implements IWorkShift {
  @PrimaryGeneratedColumn('uuid', {
    name: 'work_shift_id',
  })
  work_shift_id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    name: 'check_in_time',
    type: 'time with time zone',
    nullable: false,
  })
  check_in_time: string;

  @Column({
    name: 'departure_time',
    type: 'time with time zone',
    nullable: true,
  })
  departure_time: string;

  @Column({
    name: 'is_shift_open',
    type: 'bool',
    default: false,
  })
  is_shift_open: boolean;
}
