import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";

import { AppDataSrc } from "../core/dataSource";
import { Book } from "../models/book.model";
// import { Lesson } from "../models/lesson.model";

async function deleteDb() {
  await AppDataSrc.initialize();
  console.log(`database connection is ready!`);

  console.log(`deleting courses table`);

  await AppDataSrc.getRepository(Book).delete({});
}

deleteDb()
  .then(() => {
    console.log(`Database delete successfully .`);
    process.exit(1);
  })
  .catch((err) => {
    console.error(`Error in deleting database = >`, err);
  });
