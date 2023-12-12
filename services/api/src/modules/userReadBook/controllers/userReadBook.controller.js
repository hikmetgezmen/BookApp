import { ServiceResponse } from "../../../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";
import userReadBookService from "../services/userReadBook.service.js";

export const getAllRequest = async (req, res) => {
  const { user } = req.params;
  const data = await userReadBookService.getAllByUserId(user);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export const getAllByUserRequest = async (req, res) => {
  const user = req.user.id;
  const data = await userReadBookService.getAllByUserId(user);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export const createOrUpdateRequest = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const data = await userReadBookService.createOrUpdate(req.body);
    return res
      .status(HttpStatusCodes.CREATED)
      .json(ServiceResponse.successWithData(data, HttpStatusCodes.CREATED));
  } catch (error) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(
        ServiceResponse.fail(HttpStatusCodes.BAD_REQUEST, true, req.path, [
          error.message,
        ])
      );
  }
};

export const deleteRequest = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const data = await userReadBookService.delete(id, userId);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export default {
  getAllRequest,
  getAllByUserRequest,
  createOrUpdateRequest,
  deleteRequest,
};
