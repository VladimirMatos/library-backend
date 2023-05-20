import { BookPage } from 'src/book-page/book-page.entity';
import { BookRent } from 'src/book-rent/book-rent.entity';
import { Category } from 'src/category/category.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;

  @OneToOne(() => User)
  @JoinColumn()
  author: User;

  @OneToMany(() => BookPage, (bookPage) => bookPage.book)
  @JoinColumn()
  bookPage: BookPage[];

  @OneToMany(() => BookRent, (bookRent) => bookRent.book)
  @JoinColumn()
  bookRent: BookRent[];

  @Column()
  totalPage: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
