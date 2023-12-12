import express from "express";
import controller from "../controllers/book.controller.js";
import {
  requiredAdminMiddleware,
  requiredUserMiddleware,
} from "../../../middlewares/auth.middleware.js";
const router = express.Router();

router
  .route("/")
  .get(requiredUserMiddleware, controller.getAllRequest)
  .post(requiredAdminMiddleware, controller.createRequest);

router.route("/:id").get(requiredUserMiddleware, controller.getByIdRequest);

export default router;
