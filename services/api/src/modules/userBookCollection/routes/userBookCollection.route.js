import express from "express";
import controller from "../controllers/userBookCollection.controller.js";
import { requiredUserMiddleware } from "../../../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(requiredUserMiddleware, controller.getAllRequest)
  .post(requiredUserMiddleware, controller.createRequest);

router
  .route("/user")
  .get(requiredUserMiddleware, controller.getByUserIdRequest);

router
  .route("/:collectionId")
  .get(requiredUserMiddleware, controller.getByCollectionIdRequest)
  .delete(requiredUserMiddleware, controller.deleteRequest);

router
  .route("/:collectionId/:bookId")
  .delete(requiredUserMiddleware, controller.removeCollectionItemRequest);

router
  .route("/items")
  .post(requiredUserMiddleware, controller.addCollectionItemRequest);

router
  .route("/user/:userId")
  .get(requiredUserMiddleware, controller.getByUserIdRequest);

export default router;
