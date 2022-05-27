import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  pageCount: number;
  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
