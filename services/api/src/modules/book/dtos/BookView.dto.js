import AuthorViewDto from "../../author/dtos/AuthorView.dto.js";
import CategoryViewDto from "../../category/dtos/CategoryView.dto.js";
import PublisherViewDto from "../../publisher/dtos/PublisherView.dto.js";
import { isObject } from "../../../helpers/index.js";
class BookViewDto {
  constructor(book) {
    this.id = book.id;
    this.name = book.name;
    this.isbn = book.isbn;
    this.page = book.page;
    this.description = book.description;
    this.rate = book.rate;

    if (isObject(book.author)) {
      this.author = new AuthorViewDto(book.author);
      this.authorId = this.author.id;
    } else this.authorId = book.author;

    if (isObject(book.category)) {
      this.category = new CategoryViewDto(book.category);
      this.categoryId = this.category.id;
    } else this.categoryId = book.category;

    if (isObject(book.publisher)) {
      this.publisher = new PublisherViewDto(book.publisher);
      this.publisherId = this.publisher.id;
    } else this.publisherId = book.publisher;
  }
}

export default BookViewDto;
