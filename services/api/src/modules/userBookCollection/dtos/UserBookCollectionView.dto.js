import UserViewDto from "../../auth/dtos/userView.dto.js";
import BookViewDto from "../../book/dtos/BookView.dto.js";
import { isObject } from "../../../helpers/index.js";
class UserBookCollectionViewDto {
  constructor(data) {
    this.id = data.id ?? data._id;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    if (data.items)
      this.items = data.items.map((item) => new BookViewDto(item.book));

    this.itemsCount = this.items?.length ?? data.itemsCount ?? 0;

    if (isObject(data.user)) {
      this.user = new UserViewDto(data.user);
      this.userId = this.user.id;
    } else this.userId = data.user;
  }
}

export default UserBookCollectionViewDto;
