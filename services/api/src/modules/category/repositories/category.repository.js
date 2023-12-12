import ApiError from "../../../common/apiError.js";
import HttpStatusCodes from "http-status-codes";
import Category from "../../../models/Category.schema.js";

class CategoryRepository {
  getAll() {
    return Category.find({});
  }
  create(publisher) {
    return Category.create(publisher);
  }
}

const instance = new CategoryRepository();

export default instance;

export { CategoryRepository };
