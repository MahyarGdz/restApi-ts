import { Author } from "../../entities";

export class AuthorDTO {
  id: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(author: Author) {
    this.id = author.id;
    this.fullName = author.fullName;
    this.createdAt = author.createdAt;
    this.updatedAt = author.updatedAt;
  }
}
