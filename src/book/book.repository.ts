import { Book } from "../models/book.model";
import { DeepPartial, DeleteResult, Repository, UpdateResult } from "typeorm";

class BookRepository extends Repository<Book> {
  //
  public async findAll(): Promise<Book[]> {
    return await this.find({ relations: { author: true } });
  }

  public async findByTitle(title: string): Promise<Book | null> {
    return await this.findOneBy({ title: title });
  }


  public async findById(id: number): Promise<Book | null> {
    return await this.findOneBy({ id: id });
  }

  public async createBook(bookData: Book): Promise<Book> {
    const book = this.create(bookData);
    return await this.save(book);
  }

  public async updateBook(id: number , bookData: DeepPartial<Book>):Promise<UpdateResult | null> {
    const book = await this.findById(id);

    if (!book) {
      return null; // Book not found, return null or throw an error
    }

    return await this.createQueryBuilder("book")
      .update(book)
      .set(bookData)
      .execute();
  }

  public async deleteById(id: number): Promise<DeleteResult | null> {
    const book = await this.findOneBy({ id: id });

    if (!book) return null;

    return await this.delete({ id: id });
  }
}

export default BookRepository;
