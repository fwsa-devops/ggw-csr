"use server";

import logger from "@/lib/logger";
import { CommonValidator } from "../validators/core-validator";
import { IResponse } from "../types";
import { isException } from "../exceptions/exception";
import * as UserDAO from "../dao/user.dao";
import { UserValidator } from "../validators/user.validator";

export async function findById(userId: string) {
  try {
    logger.info("UserService.findById", userId);
    await UserValidator.isValidId(userId);
    const response = await UserDAO.findById(userId);
    return IResponse.toJSON(200, "User found", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error))
      return IResponse.toJSON<null>(error.code, error.message, null);
    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}

export async function findByEmail(email: string) {
  try {
    logger.info("UserService.findById");
    await UserValidator.isValidEmail(email);
    const response = await UserDAO.findByEmail(email);
    return IResponse.toJSON(200, "User found", response);
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
    if (isException(error))
      return IResponse.toJSON<null>(error.code, error.message, null);
    return IResponse.toJSON<null>(500, "Internal server error", null);
  }
}
