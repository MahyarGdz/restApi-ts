import express, { Router } from "express";
import { Author, Book } from "../entities";
import { BookRepository, BookService, BookController } from ".";
import { AuthorRepository } from "../author";
import { logger, asyncWrapper, AppDataSrc } from "../core";

const bookRepository = new BookRepository(Book, AppDataSrc.manager);
const authorRepository = new AuthorRepository(Author, AppDataSrc.manager);

const bookService = new BookService(bookRepository, authorRepository);

const bookController = new BookController(bookService, logger);

const router: Router = express.Router();

router.get("/api/books", asyncWrapper(bookController.getAll.bind(bookController)));
router.get("/api/books/:id", asyncWrapper(bookController.getOneWithId.bind(bookController)));
// router.get("/api/books/:id(\\d+)",asyncWrapper(bookController.getOneWithId.bind(bookController)));
// router.get("/api/books/:title",asyncWrapper( bookController.getOneWithTitle.bind(bookController)));
router.post("/api/books", asyncWrapper(bookController.create.bind(bookController)));
router.delete("/api/books/:id", asyncWrapper(bookController.delete.bind(bookController)));
router.patch("/api/books/:id", asyncWrapper(bookController.update.bind(bookController)));

export default router;
