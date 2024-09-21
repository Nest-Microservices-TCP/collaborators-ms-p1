import { Expose } from 'class-transformer';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';

export class PositionResponseDto extends BaseResponseDto {
  @Expose()
  name: string;

  @Expose()
  description: string;
}
