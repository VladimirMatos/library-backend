import { ApiProperty } from '@nestjs/swagger';

export class RolesDoc {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
