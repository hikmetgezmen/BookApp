import express from "express";
import controller from "../controllers/userReadBook.controller.js";
import { requiredUserMiddleware } from "../../../middlewares/auth.middleware.js";
const router = express.Router();

router
  .route("/")
  .post(requiredUserMiddleware, controller.createOrUpdateRequest)
  .get(requiredUserMiddleware, controller.getAllByUserRequest);

router.route("/:user").get(requiredUserMiddleware, controller.getAllRequest);

router.route("/:id").delete(requiredUserMiddleware, controller.deleteRequest);

export default router;
