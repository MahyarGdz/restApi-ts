import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";

import { AUTHOR } from "./data";
import { AppDataSrc } from "../core/dataSource";
import { Book } from "../models/book.model";
import { Author } from "../models/author.model";
import { DeepPartial } from "typeorm";

async function populateDb() {
  await AppDataSrc.initialize();
  console.log(`database connection is ready!`);

  const auhtors = Object.values(AUTHOR) as DeepPartial<Author[]>;
  const auhtorRepository = AppDataSrc.getRepository(Author);
  const bookRepository = AppDataSrc.getRepository(Book);

  for (let auhtorData of auhtors) { 
    console.log(`inserting auhtor ${auhtorData.fullName}`);
    const auhtor = auhtorRepository.create(auhtorData);
    await auhtorRepository.save(auhtor);

    for (let bookData of auhtorData.books!) { 
      console.log(`inserting book ${bookData.title} `);
      const book = bookRepository.create(bookData);
      book.author = auhtor;
      await bookRepository.save(book);
    }
  }
  const totalAuthors = await auhtorRepository.createQueryBuilder().getCount();
  const totalBooks = await bookRepository.createQueryBuilder().getCount();

  console.log(`total authors => ${totalAuthors}`);
  console.log(`total books => ${totalBooks}`);
}

populateDb()
  .then(() => {
    console.log(`Database seeded successfully .`);
    process.exit(1);
  })
  .catch((err) => {
    console.error(`Error in seeding database = >`, err);
  });
