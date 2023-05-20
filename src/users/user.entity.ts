import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Roles } from 'src/roles/role.entity';
import { BookRent } from 'src/book-rent/book-rent.entity';

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

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
