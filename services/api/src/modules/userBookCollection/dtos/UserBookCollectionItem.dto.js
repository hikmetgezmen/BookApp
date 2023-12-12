import { isObject } from "../../../helpers/index.js";
import UserBookCollectionViewDto from "./UserBookCollectionView.dto.js";
import BookViewDto from "../../book/dtos/BookView.dto.js";
class UserBookCollectionItemViewDto {
  constructor(data) {
    this.id = data.id;

    if (isObject(data.userBookCollection)) {
      this.userBookCollection = new UserBookCollectionViewDto(
        data.userBookCollection
      );
      this.userBookCollectionId = this.userBookCollection.id;
    } else this.userBookCollectionId = data.userBookCollection;

    if (isObject(data.book)) {
      this.book = new BookViewDto(data.book);
      this.bookId = this.book.id;
    } else this.bookId = data.book;
  }
}

export default UserBookCollectionItemViewDto;
