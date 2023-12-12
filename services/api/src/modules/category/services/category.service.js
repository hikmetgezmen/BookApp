import CategoryViewDto from "../dtos/CategoryView.dto.js";
import categoryRepository from "../repositories/category.repository.js";
class CategoryService {
  async getAll() {
    const authors = await categoryRepository.getAll();
    const models = authors.map((author) => new CategoryViewDto(author));
    return models;
  }
  async create(category) {
    const created = await categoryRepository.create(category);
    return new CategoryViewDto(created);
  }
}

const instance = new CategoryService();

export default instance;

export { CategoryService };
