import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;
  @ApiProperty()
  @IsNotEmpty()
  public password: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  @ApiProperty()
  public books: string[];
}
