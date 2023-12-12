import PublisherViewDto from "../dtos/PublisherView.dto.js";
import publisherRepository from "../repositories/publisher.repository.js";
class PublisherService {
  async getAll() {
    const authors = await publisherRepository.getAll();
    const models = authors.map((author) => new PublisherViewDto(author));
    return models;
  }
  async create(publisher) {
    const created = await publisherRepository.create(publisher);
    return new PublisherViewDto(created);
  }
}

const instance = new PublisherService();

export default instance;

export { PublisherService };
