import { ApiProperty } from '@nestjs/swagger';

export class CategoryDoc {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
