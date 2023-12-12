import UserBookCollectionViewDto from "../dtos/UserBookCollectionView.dto.js";
import userBookCollectionRepository from "../repositories/userBookCollection.repository.js";
import UserBookCollectionItemViewDto from "../dtos/UserBookCollectionItem.dto.js";
class UserBookCollectionService {
  async getAll() {
    const authors = await userBookCollectionRepository.getAll();
    const models = authors.map((data) => new UserBookCollectionViewDto(data));
    return models;
  }
  async create(data) {
    const created = await userBookCollectionRepository.create(data);
    return new UserBookCollectionViewDto(created);
  }
  async addCollectionItem(collectionId, bookId, userId) {
    const item = await userBookCollectionRepository.addCollectionItem(
      collectionId,
      bookId,
      userId
    );
    return new UserBookCollectionItemViewDto(item);
  }

  async getByCollectionId(collectionId) {
    const found = await userBookCollectionRepository.getByCollectionId(
      collectionId
    );
    return new UserBookCollectionViewDto(found);
  }

  removeCollectionItem(collectionId, bookId, userId) {
    return userBookCollectionRepository.removeCollectionItem(
      collectionId,
      bookId,
      userId
    );
  }
  async delete(id, userId) {
    const found = await userBookCollectionRepository.delete(id, userId);
    return new UserBookCollectionViewDto(found);
  }

  async getByUserId(userId) {
    const data = await userBookCollectionRepository.getByUserId(userId);
    const models = data.map((data) => new UserBookCollectionViewDto(data));
    return models;
  }
}

const instance = new UserBookCollectionService();

export default instance;

export { UserBookCollectionService };
