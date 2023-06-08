import { Book } from '@/bookEntity/book.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'book-pages' })
export class BookPage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @Column()
  page: number;

  @ManyToOne(() => Book, (book) => book.bookPage)
  @JoinColumn()
  book: Book;
}
