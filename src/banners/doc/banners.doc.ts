import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BannersDoc {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  subtitle: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  @Type(() => Date)
  createdAt: Date;
}
