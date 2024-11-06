import { BaseResponseDto } from 'src/common/dto/response';
import { Expose } from 'class-transformer';

export class WorkShiftResponseDto extends BaseResponseDto {
  @Expose()
  name: string;

  @Expose()
  checkInTime: Date;

  @Expose()
  departureTime: Date;

  @Expose()
  isShiftOpen: boolean;
}
