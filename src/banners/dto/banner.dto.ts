import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class getOneBannerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
