import { Author } from "../entities";
import { EntityManager, EntityTarget, Repository } from "typeorm";

class AuthorRepository extends Repository<Author> {
  constructor(target: EntityTarget<Author>, manager: EntityManager) {
    super(target, manager);
  }
}

export default AuthorRepository;
