import { Expose } from 'class-transformer';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';

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
