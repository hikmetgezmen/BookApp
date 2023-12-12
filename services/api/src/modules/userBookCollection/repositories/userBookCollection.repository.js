import ApiError from "../../../common/apiError.js";
import HttpStatusCodes from "http-status-codes";
import UserBookCollection from "../../../models/UserBookCollection.schema.js";
import Book from "../../../models/Book.schema.js";
import UserBookCollectionItem from "../../../models/UserBookCollectionItem.schema.js";
import { MODELS } from "../../../constants/models.js";
class UserBookCollectionRepository {
  getAll() {
    return UserBookCollection.aggregate([
      {
        $lookup: {
          from: MODELS.USER_BOOK_COLLECTION_ITEMS,
          localField: "_id",
          foreignField: "userBookCollection",
          as: "collectionItems",
        },
      },
      {
        $addFields: {
          itemsCount: { $size: "$collectionItems" },
        },
      },
      {
        $lookup: {
          from: MODELS.USERS,
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$user", 0] },
        },
      },
    ]);
  }
  create(data) {
    return UserBookCollection.create(data);
  }

  async addCollectionItem(collectionId, bookId, userId) {
    var foundCollection = await UserBookCollection.findById(collectionId);
    if (!foundCollection)
      throw new ApiError("Collection not found", HttpStatusCodes.NOT_FOUND);

    if (foundCollection.user.toString() !== userId)
      throw new ApiError(
        "You are not allowed to add books to this collection",
        HttpStatusCodes.FORBIDDEN
      );

    var foundBook = await Book.findById(bookId);
    if (!foundBook)
      throw new ApiError("Book not found", HttpStatusCodes.NOT_FOUND);

    var foundCollectionItem = await UserBookCollectionItem.findOne({
      userBookCollection: collectionId,
      book: bookId,
    });
    if (foundCollectionItem)
      throw new ApiError(
        "Book already added to collection",
        HttpStatusCodes.BAD_REQUEST
      );

    var collectionItem = {
      userBookCollection: collectionId,
      book: bookId,
    };

    var item = await UserBookCollectionItem.create(collectionItem);
    return item;
  }

  async getByCollectionId(collectionId) {
    var found = await UserBookCollection.findById(collectionId).populate(
      "user"
    );
    if (!found)
      throw new ApiError("Collection not found", HttpStatusCodes.NOT_FOUND);

    var items = await UserBookCollectionItem.find({
      userBookCollection: collectionId,
    })
      .populate({
        path: "book",
        // populate: ["author", "category", "publisher"],
        populate: "author",
      })
      .sort({ createdAt: -1 });

    found.items = items;
    return found;
  }

  async delete(id, userId) {
    const found = await UserBookCollection.findByIdAndDelete(id);
    if (!found)
      throw new ApiError("Collection not found", HttpStatusCodes.NOT_FOUND);

    if (found.user.toString() !== userId)
      throw new ApiError(
        "You are not allowed to delete this collection",
        HttpStatusCodes.FORBIDDEN
      );

    await UserBookCollectionItem.deleteMany({ userBookCollection: id });
    return found;
  }
  async removeCollectionItem(collectionId, bookId, userId) {
    const found = await UserBookCollection.findByIdAndDelete(collectionId);
    if (!found)
      throw new ApiError("Collection not found", HttpStatusCodes.NOT_FOUND);

    if (found.user.toString() !== userId)
      throw new ApiError(
        "You are not allowed to remove books from this collection",
        HttpStatusCodes.FORBIDDEN
      );

    return UserBookCollectionItem.findOneAndRemove({
      userBookCollection: collectionId,
      book: bookId,
    });
  }

  getByUserId(userId) {
    return UserBookCollection.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $lookup: {
          from: MODELS.USER_BOOK_COLLECTION_ITEMS,
          localField: "_id",
          foreignField: "userBookCollection",
          as: "collectionItems",
        },
      },
      {
        $addFields: {
          itemsCount: { $size: "$collectionItems" },
        },
      },
      {
        $lookup: {
          from: MODELS.USERS,
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$user", 0] },
        },
      },
    ]);
  }
}

const instance = new UserBookCollectionRepository();

export default instance;

export { UserBookCollectionRepository };
