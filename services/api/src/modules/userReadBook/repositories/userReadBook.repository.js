import ApiError from "../../../common/apiError.js";
import HttpStatusCodes from "http-status-codes";
import UserReadBook from "../../../models/UserReadBook.schema.js";

class UserReadBookRepository {
  getAllByUserId(user) {
    return UserReadBook.find({ user }).populate({
      path: "book",
      populate: "author",
    });
  }
  async createOrUpdate({ readAt, user, book }) {
    const found = await UserReadBook.findOne({ user, book });
    if (found)
      return await UserReadBook.findByIdAndUpdate(
        found.id,
        { readAt },
        { new: true }
      );
    return await UserReadBook.create({ readAt, book, user });
  }
  async delete(id, userId) {
    const found = await UserReadBook.findById(id);
    if (!found)
      throw new ApiError("User read book not found", HttpStatusCodes.NOT_FOUND);

    if (found.user.toString() !== userId)
      throw new ApiError(
        "User read book can only be deleted by the user who created it",
        HttpStatusCodes.FORBIDDEN
      );

    return await UserReadBook.findByIdAndDelete(id);
  }
}

const instance = new UserReadBookRepository();

export default instance;

export { UserReadBookRepository };
