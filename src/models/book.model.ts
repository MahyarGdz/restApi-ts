import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Author } from "./author.model";

// import { Lesson } from "./lesson.model";

@Entity({ name: "BOOKS" })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  Description: string;

  @Column()
  imageUrl: string;

  @Column()
  category: string;

  @Column()
  url: string;

  @Column()
  price: number;

  @ManyToOne(() => Author, (auhtor) => auhtor.books)
  @JoinColumn({
    name: "authorId",
  })
  author: Author;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
