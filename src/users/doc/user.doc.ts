import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { BookRentDoc } from '@/bookRentDoc/book-rent.doc';
import { RolesDoc } from '@/rolesDoc/roles.doc';

export class UserDoc {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({ type: () => BookRentDoc })
  @Type(() => BookRentDoc)
  bookRent: BookRentDoc[];

  @ApiProperty()
  @Type(() => RolesDoc)
  role: RolesDoc;

  @ApiProperty()
  @Type(() => Date)
  createAt: Date;
}
