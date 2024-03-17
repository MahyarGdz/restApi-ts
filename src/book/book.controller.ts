import { Response, Request } from "express";
import BookService from "./book.servicee";
import { Logger } from "winston";

class BookController {
  constructor(private BookService: BookService, private logger: Logger) {}

  public async getAll(_req: Request, res: Response) {
    this.logger.info(`calling getAll() `);
    const books = await this.BookService.getAllBooks();
    res.send({ books });
  }

  public async getOneWithTitle(req: Request, res: Response) {
    this.logger.info(`calling getOneWithTitle() `);
    const { title } = req.params;
    const book = await this.BookService.getOneByTitle(title);
    res.json({ book });
  }
  public async getOneWithId(req: Request, res: Response) {
    this.logger.info(`calling getOneWithId() `);
    const { id } = req.params;
    const book = await this.BookService.getOneById(parseInt(id));
    res.json({ book });
  }

  public async create(req: Request, res: Response) {
    this.logger.info(`calling create() `);
    const { body } = req;
    const book = await this.BookService.createBook(body);
    res.status(201).json({ message: "book created successfully", book });
  }
  public async update(req: Request, res: Response) {
    this.logger.info(`calling update() `);
    const { body } = req;
    const { id } = req.params;
    const result = await this.BookService.updateBook(parseInt(id), body);
    res.status(201).json({ message: "book created successfully", result });
  }
  public async delete(req: Request, res: Response) {
    this.logger.info(`calling delete() `);
    const { id } = req.params;
    const result = await this.BookService.deleteBook(parseInt(id));
    res.json({ message: "book deleted successfully", result });
  }
}
export default BookController;
