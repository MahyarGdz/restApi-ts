import { NotFoundError } from "../core/errors";
import { Book } from "../models/book.model";
import BookRepository from "./book.repository";

class BookService {
  constructor(private bookRepository: BookRepository) {}

  public async getAllBooks(): Promise<Book[]> {
    const books = await this.bookRepository.findAll();
    return books;
  }

  public async getOneByTitle(title: string): Promise<Book | null> {
    const book = await this.bookRepository.findByTitle(title);
    if (!book) throw new NotFoundError("Book not found by given title");
    return book;
  }
  public async getOneById(id: number): Promise<Book | null> {
    const book = await this.bookRepository.findById(id);
    if (!book) throw new NotFoundError("Book not found by given id");
    return book;
  }

  public async createBook(bookData: Book): Promise<Book> {
    const book = await this.bookRepository.createBook(bookData);
    return book;
  }
  public async updateBook(id: number, bookData: Book) {
    const result = await this.bookRepository.update(id, bookData);
    if (!result) throw new NotFoundError("Book not found by given id");

    return result;
  }

  public async deleteBook(id: number) {
    const result = await this.bookRepository.deleteById(id);
    if (!result) throw new NotFoundError("Book not found by given id");
    return result;
  }
}

export default BookService;
