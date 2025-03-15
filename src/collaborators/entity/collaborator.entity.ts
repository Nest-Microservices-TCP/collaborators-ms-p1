import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Collaborator as ICollaborator } from 'src/grpc/proto/collaborators/collaborators.pb';

import { BaseEntity } from 'src/common/entity';

@Entity({ name: 'collaborators' })
export class Collaborator extends BaseEntity implements ICollaborator {
  @PrimaryGeneratedColumn('uuid', {
    name: 'collaborator_id',
  })
  collaborator_id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  last_name: string;

  @Column({
    name: 'in_turn',
    type: 'boolean',
    default: false,
  })
  in_turn: boolean;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 25,
    nullable: true,
    unique: true,
  })
  phone: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: true,
    unique: true,
  })
  email: string;

  @Column({
    name: 'direction',
    type: 'text',
    nullable: true,
  })
  direction: string;

  /**
   * @precision Cantidad total de dígitos que se pueden almacenar,
   * tanto a la izquierda como a la derecha del punto decimal
   *
   * @scale Cantidad de dígitos que se almacenan a la derecha del
   * punto decimal
   *
   * Por ejemplo, aquí se define que se puede almacenar hasta 10
   * dígitos en total, con 2 de ellos después del punto decimal
   *
   * 99999999.99
   */
  @Column({
    name: 'salary',
    type: 'numeric',
    precision: 9,
    scale: 2,
    default: 0,
    nullable: true,
  })
  salary: number;

  @Column({
    name: 'profile_photo',
    type: 'text',
    nullable: true,
  })
  profile_photo: string;
}
