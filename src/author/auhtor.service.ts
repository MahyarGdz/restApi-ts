import { AuthorRepository } from ".";
import { NotFoundError } from "../core";
import { Author } from "../entities";

class AuthorService {
  constructor(private authorRepository: AuthorRepository) {}

  public async getOne(id: string): Promise<Author> {
    const author = await this.authorRepository.findOne({ where: { id: id } });
    if (!author) throw new NotFoundError("author not found by given id");
    return author;
  }
}
export default AuthorService;
