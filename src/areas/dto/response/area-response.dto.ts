import { Expose } from 'class-transformer';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';

export class AreaResponseDto extends BaseResponseDto {
  @Expose()
  name: string;
}
