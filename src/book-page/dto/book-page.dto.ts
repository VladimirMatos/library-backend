import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class BookPageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  text: string;
}
