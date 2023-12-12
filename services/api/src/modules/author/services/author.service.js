import AuthorViewDto from "../dtos/AuthorView.dto.js";
import authorRepository from "../repositories/author.repository.js";
class AuthorService {
  async getAll() {
    const authors = await authorRepository.getAll();
    const models = authors.map((author) => new AuthorViewDto(author));
    return models;
  }
  async create(author) {
    const created = await authorRepository.create(author);
    return new AuthorViewDto(created);
  }
}

const instance = new AuthorService();

export default instance;

export { AuthorService };
