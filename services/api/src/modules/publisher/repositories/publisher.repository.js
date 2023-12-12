import ApiError from "../../../common/apiError.js";
import HttpStatusCodes from "http-status-codes";
import Publisher from "../../../models/Publisher.schema.js";

class PublisherRepository {
  getAll() {
    return Publisher.find({});
  }
  create(publisher) {
    return Publisher.create(publisher);
  }
}

const instance = new PublisherRepository();

export default instance;

export { instance };
