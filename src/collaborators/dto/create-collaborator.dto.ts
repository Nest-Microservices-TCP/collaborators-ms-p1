import {
  MaxLength,
  IsUrl,
  IsString,
  IsPositive,
  IsOptional,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateCollaboratorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  lastName: string;

  @IsString()
  @IsOptional()
  @MaxLength(25)
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  email?: string;

  @IsString()
  @IsOptional()
  direction?: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  salary?: number;

  @IsString()
  @IsOptional()
  @IsUrl()
  profilePhoto?: string;
}
