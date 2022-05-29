import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public pageCount: number;
}
