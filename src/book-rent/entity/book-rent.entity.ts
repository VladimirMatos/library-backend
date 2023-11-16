import { Book } from '@/bookEntity/book.entity';
import { User } from '@/userEntity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BookRent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookRents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Book, (book) => book.bookRent, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  book: Book;

  @Column('boolean', { default: false })
  status: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
