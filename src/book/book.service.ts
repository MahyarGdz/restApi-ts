import { validate } from "class-validator";
import { BookRepository, CreateBookDto } from ".";
import { AuthorRepository } from "../author";
import { BadRequestError, NotFoundError } from "../core";
import { Book } from "../entities";

class BookService {
  constructor(
    private bookRepository: BookRepository,
    private authorRepository: AuthorRepository,
  ) {}

  public async getAllBooks(): Promise<Book[]> {
    const books = await this.bookRepository.find({
      relations: { author: true },
    });
    return books;
  }

  public async getOneByTitle(title: string): Promise<Book | null> {
    const book = await this.bookRepository.findOneBy({ title: title });
    if (!book) throw new NotFoundError("Book not found by given title");
    return book;
  }
  public async getOneById(id: string): Promise<Book | null> {
    const book = await this.bookRepository.findOneBy({ id: id });
    if (!book) throw new NotFoundError("Book not found by given id");
    return book;
  }

  public async createBook(bookData: CreateBookDto): Promise<Book> {
    const bookDto = new CreateBookDto(bookData);
    const errors = await validate(bookDto);
    if (errors.length > 0) {
      console.log(errors);

      const errorMessage = errors.map((error) => Object.values(error.constraints!)).flat();
      throw new BadRequestError("bad request", errorMessage);
    }

    const author = await this.authorRepository.findOneBy({ id: bookDto.authorId });

    if (!author) throw new NotFoundError("author not found by given id");

    const book = this.bookRepository.create({ ...bookDto, author });
    return await this.bookRepository.save(book);
  }

  public async updateBook(id: string, bookData: Book) {
    const result = await this.bookRepository.updateBook(id, bookData);
    if (!result) throw new NotFoundError("Book not found by given id");
    return result;
  }

  public async deleteBook(id: string) {
    const book = await this.bookRepository.findOneBy({ id: id });
    if (!book) throw new NotFoundError("Book not found by given id");

    return await this.bookRepository.delete({ id: book.id });
  }
}

export default BookService;
