import UserBookRateViewDto from "../dtos/UserBookRateView.dto.js";
import UserBookRateLikeViewDto from "../dtos/UserBookRateLikeView.dto.js";
import userBookRateRepository from "../repositories/userBookRate.repository.js";
import { PaginationModel } from "../../../common/pagination.js";
class UserBookRateService {
  async getAll() {
    const data = await userBookRateRepository.getAll();
    const models = data.map((item) => new UserBookRateViewDto(item));
    return models;
  }
  async getAllPagination(query) {
    const userRates = await this.getAll();
    const data = PaginationModel.create(userRates, query, (item, search) =>
      item.content.toLowerCase().includes(search)
    );
    return data;
  }
  async create(data) {
    const created = await userBookRateRepository.create(data);
    return new UserBookRateViewDto(created);
  }
  async delete(id, userId) {
    const deleted = await userBookRateRepository.delete(id, userId);
    return new UserBookRateViewDto(deleted);
  }

  async getByUserId(userId, query) {
    const data = await userBookRateRepository.getByUserId(userId);
    const models = data.map((item) => new UserBookRateViewDto(item));
    const result = PaginationModel.create(models, query, (item, search) =>
      item.content.toLowerCase().includes(search)
    );
    return result;
  }

  async getById(id) {
    const data = await userBookRateRepository.getById(id);
    return new UserBookRateViewDto(data);
  }

  async like(payload) {
    const data = await userBookRateRepository.like(payload);
    return new UserBookRateLikeViewDto(data);
  }
}

const instance = new UserBookRateService();

export default instance;

export { UserBookRateService };
