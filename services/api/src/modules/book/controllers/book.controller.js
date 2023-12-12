import { ServiceResponse } from "../../../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";
import bookService from "../services/book.service.js";

export const getAllRequest = async (_, res) => {
  const data = await bookService.getAll();
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export const getByIdRequest = async (req, res) => {
  try {
    const data = await bookService.getById(req.params.id);
    return res
      .status(HttpStatusCodes.OK)
      .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
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

export const createRequest = async (req, res) => {
  try {
    const data = await bookService.create(req.body);
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
  getByIdRequest,
};
