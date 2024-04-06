import { Book } from "../entities";
import { DeepPartial, EntityManager, EntityTarget, Repository, UpdateResult } from "typeorm";

class BookRepository extends Repository<Book> {
  constructor(target: EntityTarget<Book>, manager: EntityManager) {
    super(target, manager);
  }

  public async updateBook(id: string, bookData: DeepPartial<Book>): Promise<UpdateResult | null> {
    const book = await this.findOneBy({ id: id });

    if (!book) {
      return null; // Book not found, return null or throw an error
    }

    return await this.createQueryBuilder("book").update(book).set(bookData).execute();
    // return this.update(book.id, bookData);
  }
}

export default BookRepository;
