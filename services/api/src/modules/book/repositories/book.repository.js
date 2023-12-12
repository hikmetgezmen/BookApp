import ApiError from "../../../common/apiError.js";
import HttpStatusCodes from "http-status-codes";
import Book from "../../../models/Book.schema.js";

class BookRepository {
  getAll() {
    return Book.find({})
      .populate("author")
      .populate("category")
      .populate("publisher");
  }

  async getById(id) {
    const found = await Book.findById(id)
      .populate("author")
      .populate("category")
      .populate("publisher");
    if (!found) {
      throw new ApiError("Book not found", HttpStatusCodes.NOT_FOUND);
    }
    return found;
  }

  create(book) {
    return Book.create(book);
  }
}

const instance = new BookRepository();

export default instance;

export { BookRepository };
