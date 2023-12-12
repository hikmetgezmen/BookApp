import express from "express";
import controller from "../controllers/userBookRate.controller.js";
import { requiredUserMiddleware } from "../../../middlewares/auth.middleware.js";
const router = express.Router();

router
  .route("/")
  .get(requiredUserMiddleware, controller.getAllRequest)
  .post(requiredUserMiddleware, controller.createRequest);

router.route("/user/like").post(requiredUserMiddleware, controller.likeRequest);
router
  .route("/user/:userId")
  .get(requiredUserMiddleware, controller.getByUserIdRequest);

router
  .route("/:id")
  .get(requiredUserMiddleware, controller.getByIdRequest)
  .delete(requiredUserMiddleware, controller.deleteRequest);

export default router;
