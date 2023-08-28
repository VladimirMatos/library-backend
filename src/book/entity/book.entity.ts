import { BookPage } from '@/bookPageEntity/book-page.entity';
import { BookRent } from '@/bookRentEntity/book-rent.entity';
import { Category } from '@/categoryEntity/category.entity';
import { User } from '@/userEntity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => Category, (category) => category.book)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => User, (user) => user.book)
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
