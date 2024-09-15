import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateAreaDto {
  @IsUUID()
  areaId: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  name?: string;
}
