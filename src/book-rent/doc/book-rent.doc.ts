import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BookDoc } from '@/bookDoc/book.doc';

export class BookRentDoc {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: boolean;

  @ApiProperty({ type: BookDoc })
  @Type(() => BookDoc)
  book: BookDoc;
}
