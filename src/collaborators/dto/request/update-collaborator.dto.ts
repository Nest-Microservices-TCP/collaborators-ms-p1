import {
  MaxLength,
  IsUUID,
  IsUrl,
  IsString,
  IsPositive,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UpdateCollaboratorDto {
  @IsUUID()
  collaboratorId: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  lastName?: string;

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
  @IsPositive()
  @IsOptional()
  salary?: string;

  @IsUrl()
  @IsString()
  @IsOptional()
  profilePhoto?: string;
}
