import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsNumber()
  points: number;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;
}

export class UpdatePointsDto {
  @IsString()
  id: string;

  @IsNumber()
  points: number;

  @IsOptional()
  @IsString()
  history: string;
}
export class LinkEmailDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  history: string;
}
