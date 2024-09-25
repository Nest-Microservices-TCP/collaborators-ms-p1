import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateWorkShiftDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  checkInTime: Date;

  @IsString()
  @IsNotEmpty()
  departureTime: Date;

  @IsBoolean()
  @IsNotEmpty()
  isShiftOpen: boolean;
}
