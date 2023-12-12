import { ServiceResponse } from "../../../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";
import categoryService from "../services/category.service.js";

export const getAllRequest = async (_, res) => {
  const data = await categoryService.getAll();
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export const createRequest = async (req, res) => {
  try {
    const data = await categoryService.create(req.body);
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

export default {
  getAllRequest,
  createRequest,
};
