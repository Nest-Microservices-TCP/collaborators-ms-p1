import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
