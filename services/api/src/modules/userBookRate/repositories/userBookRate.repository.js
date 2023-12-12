import ApiError from "../../../common/apiError.js";
import HttpStatusCodes from "http-status-codes";
import UserBookRate from "../../../models/UserBookRate.schema.js";
import UserBookRateLike from "../../../models/UserBookRateLike.schema.js";
import Book from "../../../models/Book.schema.js";

class UserBookRateRepository {
  async #loadReacts(userBookRates) {
    const userBookRateIds = userBookRates.map((rate) => rate._id);
    const reacts = await UserBookRateLike.aggregate([
      {
        $match: { userBookRate: { $in: userBookRateIds } },
      },
      {
        $group: {
          _id: "$userBookRate",
          likeCount: { $sum: { $cond: [{ $eq: ["$type", true] }, 1, 0] } },
          dislikeCount: { $sum: { $cond: [{ $eq: ["$type", false] }, 1, 0] } },
        },
      },
    ]);

    // Map react counts to userBookRates
    const reactCountsMap = new Map();
    reacts.forEach((react) => {
      reactCountsMap.set(react._id.toString(), {
        like: react.likeCount || 0,
        dislike: react.dislikeCount || 0,
      });
    });

    // Update userBookRates with react counts
    userBookRates.forEach((rate) => {
      const reactCounts = reactCountsMap.get(rate._id.toString()) || {
        like: 0,
        dislike: 0,
      };
      rate.like = reactCounts.like;
      rate.dislike = reactCounts.dislike;
    });
  }
  async getAll() {
    const userBookRates = await UserBookRate.find({})
      .populate("user")
      .populate("book")
      .sort({ updatedAt: -1 });

    await this.#loadReacts(userBookRates);
    return userBookRates;
  }
  async getById(id) {
    const found = await UserBookRate.findById(id)
      .populate("user")
      .populate("book");
    if (!found)
      throw new ApiError(
        `User Book Rate not found id:${id}`,
        HttpStatusCodes.NOT_FOUND,
        "UserBookRateRepository"
      );

    const reacts = await UserBookRateLike.aggregate([
      {
        $match: { userBookRate: found._id },
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    found.like = reacts.find((react) => react._id)?.count || 0;
    found.dislike = reacts.find((react) => !react._id)?.count || 0;

    return found;
  }
  async getByUserId(userId) {
    const userBookRates = await UserBookRate.find({ user: userId })
      .populate("user")
      .populate("book")
      .sort({ updatedAt: -1 });
    await this.#loadReacts(userBookRates);
    return userBookRates;
  }
  async create(data) {
    const { user, book, rate, content } = data;
    let found = await UserBookRate.findOne({ user, book });
    if (found)
      found = await UserBookRate.findByIdAndUpdate(
        found.id,
        { rate, content },
        { new: true }
      );
    else found = await UserBookRate.create(data);
    await this.calculateBookRate(data.book);
    return found;
  }
  async calculateBookRate(bookId) {
    const rates = await UserBookRate.find({ book: bookId });
    const sum = rates.reduce((total, current) => total + current?.rate ?? 0, 0);
    const len = rates.length === 0 ? 1 : rates.length;
    const avg = sum / len;
    await Book.findByIdAndUpdate(bookId, { rate: avg });
  }
  async delete(id, userId) {
    const found = await UserBookRate.findById(id);
    if (!found)
      throw new ApiError("User book rate not found", HttpStatusCodes.NOT_FOUND);

    if (found.user.toString() !== userId)
      throw new ApiError(
        "You are not allowed to delete this user book rate",
        HttpStatusCodes.FORBIDDEN
      );

    return await UserBookRate.findByIdAndDelete(id);
  }
  async like({ userBookRate, user, type }) {
    type = Boolean(type);
    let found = await UserBookRateLike.findOne({ userBookRate, user });
    if (found && found.type == type)
      return await UserBookRateLike.findByIdAndRemove(found.id);
    if (found)
      return await UserBookRateLike.findByIdAndUpdate(
        found.id,
        { type },
        { new: true }
      );

    return await UserBookRateLike.create({ userBookRate, user, type });
  }
}

const instance = new UserBookRateRepository();

export default instance;

export { UserBookRateRepository };
