import authService from "../services/auth.service.js";
import SignInDto from "../dtos/sigIn.dto.js";
import HttpStatusCodes from "http-status-codes";
import { ServiceResponse } from "../../../common/serviceResponse.js";

export const signIn = async (req, res, next) => {
  const model = new SignInDto(req.body);
  try {
    const response = await authService.signIn(model);
    res
      .status(HttpStatusCodes.CREATED)
      .json(ServiceResponse.successWithData(response, HttpStatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  try {
    const response = await authService.refreshAccessToken(refreshToken);
    res
      .status(HttpStatusCodes.OK)
      .json(ServiceResponse.successWithData(response, HttpStatusCodes.OK));
  } catch (error) {
    next(error);
  }
};
