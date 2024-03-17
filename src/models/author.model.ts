import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Book } from "./book.model";

@Entity({ name: "AUTHORS" })
export class Author {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fullName: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
