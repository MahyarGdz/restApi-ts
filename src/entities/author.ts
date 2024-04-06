import { Column, Entity, Index, OneToMany, Relation } from "typeorm";
import { Book } from "./book";
import { Base } from "./base";

@Entity({ name: "AUTHORS" })
export class Author extends Base {
  @Index()
  @Column()
  fullName: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Array<Relation<Book>>;
}
