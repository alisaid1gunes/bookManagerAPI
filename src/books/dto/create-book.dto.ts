import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public pageCount: number;
  @ApiProperty()
  @IsNotEmpty()
  public userId: User;
}
