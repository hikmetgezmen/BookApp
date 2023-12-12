import { ServiceResponse } from "../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";
import jwtService from "../services/jwt.service.js";
import { RoleInfo } from "../constants/roleInfo.js";
export const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return next();
  const attributes = authorization.split(" ");
  if (attributes.length !== 2)
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json(
        ServiceResponse.fail(
          HttpStatusCodes.UNAUTHORIZED,
          false,
          "authMiddleware",
          ["Invalid authorization"]
        )
      );

  if (attributes[0] !== process.env.AUTH_SCHEMA)
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json(
        ServiceResponse.fail(
          HttpStatusCodes.UNAUTHORIZED,
          false,
          "authMiddleware",
          ["Invalid auth schema"]
        )
      );

  const token = attributes[1];
  try {
    var decoded = jwtService.verifyAccessToken(token);
    if (Date.now() >= decoded.exp * 1000)
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json(
          ServiceResponse.fail(
            HttpStatusCodes.UNAUTHORIZED,
            false,
            "authMiddleware",
            ["Unauthorized"]
          )
        );

    req.user = decoded;
    return next();
  } catch (error) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json(
        ServiceResponse.fail(
          HttpStatusCodes.UNAUTHORIZED,
          false,
          "authMiddleware",
          [error.message]
        )
      );
  }
};

export const requiredAuthMiddleware = (req, res, next) => {
  if (!req.user)
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json(
        ServiceResponse.fail(
          HttpStatusCodes.UNAUTHORIZED,
          false,
          "requiredAuthMiddleware",
          ["Unauthorized"]
        )
      );
  next();
};

export const requiredRoleMiddleware = (roles = []) => {
  return (req, res, next) => {
    if (!roles.some((x) => x === req.user.role))
      return res
        .status(HttpStatusCodes.FORBIDDEN)
        .json(
          ServiceResponse.fail(
            HttpStatusCodes.FORBIDDEN,
            false,
            "requiredRoleMiddleware",
            ["Forbidden"]
          )
        );
    next();
  };
};

export const requiredUserMiddleware = [requiredAuthMiddleware];

export const requiredAdminMiddleware = [
  requiredAuthMiddleware,
  requiredRoleMiddleware([RoleInfo.admin]),
];
