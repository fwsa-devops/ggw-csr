import logger from "@/lib/logger";
import { CommonValidator } from "@/server/validators/core-validator";
import * as UserDAO from "@/server/dao/user.dao";
import { Exception } from "../exceptions/exception";

export class UserValidator {
  public static async isValidEmail(email: string) {
    try {
      logger.info("UserValidator.existByEmail");
      CommonValidator.EMAIL(email);
      const user = await UserDAO.findByEmail(email);
      if (!user) {
        throw Exception.USER_NOT_FOUND("User not found");
      }
      return user;
    } catch (error) {
      logger.error(JSON.stringify(error, null, 2));
      throw error;
    }
  }

  public static async isValidId(userId: string) {
    try {
      logger.info("UserValidator.existById");
      CommonValidator.ID(userId);
      const user = await UserDAO.findById(userId);
      if (!user) {
        throw Exception.USER_NOT_FOUND("User not found");
      }
      return user;
    } catch (error) {
      logger.error(JSON.stringify(error, null, 2));
      throw error;
    }
  }
}
