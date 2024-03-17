import express, { Router } from "express";
import { Book } from "../models/book.model";
import BookRepository from "./book.repository";
import BookService from "./book.servicee";
import BookController from "./book.controller";
import { AppDataSrc } from "../core/dataSource";
import { logger } from "../core/logger";
import { asyncWrapper } from "../utils/asyncWrapper";


const bookRepository = new BookRepository(Book, AppDataSrc.manager);
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService, logger);

const router: Router = express.Router();

router.get("/api/books", asyncWrapper(bookController.getAll.bind(bookController)));
router.get("/api/books/:id(\\d+)",asyncWrapper(bookController.getOneWithId.bind(bookController)));
router.get("/api/books/:title",asyncWrapper( bookController.getOneWithTitle.bind(bookController)));
router.post("/api/books",asyncWrapper( bookController.create.bind(bookController)));
router.delete("/api/books/:id",asyncWrapper( bookController.delete.bind(bookController)));
router.patch("/api/books/:id",asyncWrapper( bookController.update.bind(bookController)));

export default router;
