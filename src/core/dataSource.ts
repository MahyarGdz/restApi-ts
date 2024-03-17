import { DataSource } from "typeorm";
import { Book } from "../models/book.model";
import { Author } from "../models/author.model";

export const AppDataSrc = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  database: process.env.DB_NAME,
  entities: [Book, Author],
  synchronize: true,
  logging: false,
});
