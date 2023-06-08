import { BookRent } from '@/bookRentEntity/book-rent.entity';
import { Book } from '@/bookEntity/book.entity';
import { Roles } from '@/rolesEntity/roles.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Roles)
  @JoinColumn()
  role: Roles;

  @OneToMany(() => BookRent, (bookRent) => bookRent.user)
  @JoinColumn()
  bookRents: BookRent[];

  @OneToMany(() => Book, (book) => book.author)
  @JoinColumn()
  book: Book[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
