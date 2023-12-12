import ApiError from "../../../common/apiError.js";
import HttpStatusCodes from "http-status-codes";
import Author from "../../../models/Author.schema.js";

class AuthorRepository {
  getAll() {
    return Author.find({});
  }
  create(author) {
    return Author.create(author);
  }
}

const instance = new AuthorRepository();

export default instance;

export { instance };
