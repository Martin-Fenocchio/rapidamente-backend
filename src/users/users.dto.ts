import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsNumber()
  points: number;
}

export class UpdatePointsDto {
  @IsString()
  id: string;

  @IsNumber()
  points: number;
}
