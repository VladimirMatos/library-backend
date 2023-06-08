import { ApiProperty } from '@nestjs/swagger';

export class BookPageDoc {
  @ApiProperty()
  id: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  text: string;
}
