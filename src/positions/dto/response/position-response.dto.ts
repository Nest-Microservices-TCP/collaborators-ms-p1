import { BaseResponseDto } from 'src/common/dto/response';
import { Expose } from 'class-transformer';

export class PositionResponseDto extends BaseResponseDto {
  @Expose()
  name: string;

  @Expose()
  description: string;
}
