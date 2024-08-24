import { BaseEntity } from 'src/common/entity/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'collaborators' })
export class CollaboratorEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'last_name',
    type: 'text',
    length: 255,
    nullable: false,
  })
  lastName: string;

  @Column({
    name: 'in_turn',
    type: 'boolean',
    default: false,
  })
  inTurn: boolean;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 25,
    nullable: true,
  })
  phone: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  email: string;

  @Column({
    name: 'direction',
    type: 'text',
    nullable: true,
  })
  direction: string;

  @Column({
    name: 'salary',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  salary: number;

  @Column({
    name: 'profile_photo',
    type: 'text',
    nullable: true,
  })
  profilePhoto: string;
}
