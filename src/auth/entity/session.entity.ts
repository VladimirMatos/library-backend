import { ISession } from 'connect-typeorm';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'sessions' })
export class Session implements ISession {
  @Index()
  @Column('bigint')
  expiredAt = Date.now();

  @PrimaryColumn()
  id: string;

  @Column('text')
  json: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  destroyedAt?: Date;
}
