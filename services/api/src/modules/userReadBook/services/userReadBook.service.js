import UserReadBookViewDto from "../dtos/UserReadBookView.dto.js";
import userReadBookRepository from "../repositories/userReadBook.repository.js";
class UserReadBookService {
  async getAllByUserId(user) {
    const data = await userReadBookRepository.getAllByUserId(user);
    const models = data.map((author) => new UserReadBookViewDto(author));
    return models;
  }
  async createOrUpdate(data) {
    const created = await userReadBookRepository.createOrUpdate(data);
    return new UserReadBookViewDto(created);
  }
  async delete(id, userId) {
    const deleted = await userReadBookRepository.delete(id, userId);
    return new UserReadBookViewDto(deleted);
  }
}

const instance = new UserReadBookService();

export default instance;

export { UserReadBookService };
