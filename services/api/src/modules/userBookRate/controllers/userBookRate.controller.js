import { ServiceResponse } from "../../../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";
import userBookRateService from "../services/userBookRate.service.js";
import { SearchAndPaginationQuery } from "../../../common/pagination.js";

export const getAllRequest = async (req, res) => {
  const query = new SearchAndPaginationQuery(req.headers);
  const data = await userBookRateService.getAllPagination(query);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export const createRequest = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const data = await userBookRateService.create(req.body);
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
  const data = await userBookRateService.delete(id, userId);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export const getByUserIdRequest = async (req, res) => {
  const { userId } = req.params;
  const query = new SearchAndPaginationQuery(req.headers);
  const data = await userBookRateService.getByUserId(userId, query);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export const getByIdRequest = async (req, res) => {
  const { id } = req.params;
  const data = await userBookRateService.getById(id);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export const likeRequest = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const data = await userBookRateService.like(req.body);
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
  deleteRequest,
  getByUserIdRequest,
  getByIdRequest,
  likeRequest,
};
