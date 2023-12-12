import BookViewDto from "../dtos/BookView.dto.js";
import bookRepository from "../repositories/book.repository.js";
class BookService {
  async getAll() {
    const books = await bookRepository.getAll();
    const models = books.map((book) => new BookViewDto(book));
    return models;
  }

  async getById(id) {
    const book = await bookRepository.getById(id);
    return new BookViewDto(book);
  }

  async create(book) {
    const created = await bookRepository.create(book);
    return new BookViewDto(created);
  }
}

const instance = new BookService();

export default instance;

export { BookService };
