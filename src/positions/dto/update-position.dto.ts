import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdatePositionDto {
  @IsUUID()
  positionId: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
