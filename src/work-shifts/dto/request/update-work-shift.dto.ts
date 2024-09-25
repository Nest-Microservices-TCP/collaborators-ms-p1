import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class UpdateWorkShiftDto {
  @IsUUID()
  workShiftId: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  checkInTime: Date;

  @IsString()
  @IsOptional()
  departureTime: Date;

  @IsBoolean()
  @IsOptional()
  isShiftOpen: boolean;
}
