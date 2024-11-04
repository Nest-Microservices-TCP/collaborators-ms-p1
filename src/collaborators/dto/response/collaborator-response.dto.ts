import { BaseResponseDto } from 'src/common/dto/response';
import { Expose } from 'class-transformer';

export class CollaboratorResponseDto extends BaseResponseDto {
  @Expose()
  name: string;

  @Expose()
  lastName: string;

  @Expose()
  inTurn: boolean;

  @Expose()
  phone: string;

  @Expose()
  email: string;

  @Expose()
  direction: string;

  @Expose()
  salary: number;

  @Expose()
  profilePhoto: string;
}
