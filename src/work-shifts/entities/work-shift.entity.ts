import { BaseEntity } from 'src/common/entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'work_shifts' })
export class WorkShiftEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'check_in_time',
    type: 'time with time zone',
    nullable: false,
  })
  checkInTime: Date;

  @Column({
    name: 'departure_time',
    type: 'time with time zone',
    nullable: true,
  })
  departureTime: Date;

  @Column({
    name: 'is_shift_open',
    type: 'bool',
    default: false,
  })
  isShiftOpen: boolean;
}
