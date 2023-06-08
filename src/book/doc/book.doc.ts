import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BookPageDoc } from '@/bookPageDoc/book-page.doc';
import { CategoryDoc } from '@/categoryDoc/category.doc';
import { UserDoc } from '@/userDoc/user.doc';

export class BookDoc {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  totalPage: number;

  @ApiProperty()
  @Type(() => CategoryDoc)
  category: CategoryDoc;

  @ApiProperty({ type: () => BookPageDoc })
  @Type(() => BookPageDoc)
  bookPage: BookPageDoc[];

  @ApiProperty({ type: () => UserDoc })
  @Type(() => UserDoc)
  author: UserDoc;

  @ApiProperty()
  @Type(() => Date)
  createAt: Date;
}
