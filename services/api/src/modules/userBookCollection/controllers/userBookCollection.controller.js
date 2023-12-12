import { ServiceResponse } from "../../../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";
import service from "../services/userBookCollection.service.js";

export const getAllRequest = async (_, res) => {
  const data = await service.getAll();
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export const createRequest = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const data = await service.create(req.body);
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

export const addCollectionItemRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { collectionId, bookId } = req.body;
    const data = await service.addCollectionItem(collectionId, bookId, userId);
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

export const getByCollectionIdRequest = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const data = await service.getByCollectionId(collectionId);
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

export const removeCollectionItemRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { collectionId, bookId } = req.params;
    await service.removeCollectionItem(collectionId, bookId, userId);
    return res.status(HttpStatusCodes.OK).json(ServiceResponse.success());
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

export const getByUserIdRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    let user = userId ?? req.user.id;
    const data = await service.getByUserId(user);
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

export const deleteRequest = async (req, res) => {
  const userId = req.user.id;
  const { collectionId } = req.params;
  const data = await service.delete(collectionId, userId);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export default {
  getAllRequest,
  createRequest,
  addCollectionItemRequest,
  getByCollectionIdRequest,
  removeCollectionItemRequest,
  getByUserIdRequest,
  deleteRequest,
};
