import BookViewDto from "../../book/dtos/BookView.dto.js";
import UserViewDto from "../../auth/dtos/userView.dto.js";
import { isObject } from "../../../helpers/index.js";

class UserReadBookViewDto {
  constructor(data) {
    this.id = data.id;
    this.readAt = data.readAt;
    if (isObject(data.book)) {
      this.book = new BookViewDto(data.book);
      this.bookId = this.book.id;
    } else this.bookId = data.book;

    if (isObject(data.user)) {
      this.user = new UserViewDto(data.user);
      this.userId = this.user.id;
    } else this.userId = data.user;
  }
}

export default UserReadBookViewDto;
