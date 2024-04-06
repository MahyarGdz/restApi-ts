import { Response, Request } from "express";
import { BookService } from "./index";
import { Logger } from "winston";

class BookController {
  constructor(
    private bookService: BookService,
    private logger: Logger,
  ) {}

  public async getAll(_req: Request, res: Response) {
    this.logger.info(`calling getAll() `);
    const books = await this.bookService.getAllBooks();
    res.json({ books });
  }

  public async getOneWithTitle(req: Request, res: Response) {
    this.logger.info(`calling getOneWithTitle() `);
    const { title } = req.params;
    const book = await this.bookService.getOneByTitle(title);
    res.json({ book });
  }
  public async getOneWithId(req: Request, res: Response) {
    this.logger.info(`calling getOneWithId() `);
    const { id } = req.params;
    const book = await this.bookService.getOneById(id);
    res.json({ book });
  }

  public async create(req: Request, res: Response) {
    this.logger.info(`calling create() `);
    const { body } = req;
    const book = await this.bookService.createBook(body);
    res.status(201).json({ message: "book created successfully", book });
  }
  public async update(req: Request, res: Response) {
    this.logger.info(`calling update() `);
    const { body } = req;
    const { id } = req.params;
    const result = await this.bookService.updateBook(id, body);
    res.status(201).json({ message: "book created successfully", result });
  }
  public async delete(req: Request, res: Response) {
    this.logger.info(`calling delete() `);
    const { id } = req.params;
    await this.bookService.deleteBook(id);
    res.json({ status: "ok", message: "book deleted successfully" });
  }
}
export default BookController;
