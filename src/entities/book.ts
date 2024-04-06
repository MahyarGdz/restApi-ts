import { BeforeInsert, BeforeUpdate, Column, Entity, Index, JoinColumn, ManyToOne, Relation } from "typeorm";
import { Author } from "./author";
import { Base } from "./base";
import slugify from "slugify";

@Entity({ name: "BOOKS" })
export class Book extends Base {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: false })
  category: string;

  @Index()
  @Column({ nullable: false, unique: true })
  uniqueSlug: string;

  @Column({ nullable: false })
  price: number;

  @ManyToOne(() => Author, (auhtor) => auhtor.books, { nullable: false })
  @JoinColumn({
    name: "authorId",
  })
  author: Relation<Author>;

  @BeforeInsert()
  @BeforeUpdate()
  generateUniqueSlug() {
    this.uniqueSlug = slugify(this.title, { lower: true });
    return true;
  }
}
