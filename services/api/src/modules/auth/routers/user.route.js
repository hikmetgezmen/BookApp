import express from "express";
import { RoleInfo } from "../../../constants/roleInfo.js";
import {
  requiredAuthMiddleware,
  requiredRoleMiddleware,
} from "../../../middlewares/auth.middleware.js";
import { validationResponseMiddleware } from "../../../middlewares/validationResponse.middleware.js";
import controller from "../controllers/user.controller.js";
import { userValidator } from "../validators/userValidator.js";
const router = express.Router();

router
  .route("/")
  .get(requiredAuthMiddleware, controller.getAllRequest)
  .post(userValidator, validationResponseMiddleware, controller.postRequest)
  .put(controller.updatePasswordByIdRequest);

router
  .route("/profile")
  .get(requiredAuthMiddleware, controller.getByTokenRequest);

router
  .route("/:id")
  .get(controller.getByIdRequest)
  .delete(
    requiredAuthMiddleware,
    requiredRoleMiddleware([RoleInfo.admin, RoleInfo.user]),
    controller.deleteByIdRequest
  );

router.route("/role/:role").get(controller.getByRoleRequest);

export default router;
