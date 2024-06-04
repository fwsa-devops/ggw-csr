import { StatusCodes } from "http-status-codes";

interface IException {
  name: string;
  code: number;
  description: string;
  message: string;
}

abstract class CoreException extends Error implements IException {
  public code: number;
  public description: string;

  constructor(message: string, description: string, code?: StatusCodes) {
    super(message);
    this.name = "CoreException";
    this.code = code ?? StatusCodes.INTERNAL_SERVER_ERROR;
    this.description = description;
    Object.setPrototypeOf(this, CoreException.prototype);
  }
}

export enum ExceptionMessages {
  INVALID_INPUT = "Invalid input",
  INVALID_STRING = "Invalid string",
  INVALID_NUMBER = "Invalid number",
  INVALID_EMAIL = "Invalid email address",
  INVALID_DATE = "Invalid date",
  NOT_AUTHENTICATED = "User not authenticated",
  USER_NOT_FOUND = "User not found",
}

export class Exception extends CoreException {
  public name = "Exception";

  public static INVALID_INPUT(error: string) {
    return new Exception(
      ExceptionMessages.INVALID_INPUT,
      error,
      StatusCodes.BAD_REQUEST
    );
  }

  public static INVALID_STRING(error: string) {
    return new Exception(
      ExceptionMessages.INVALID_STRING,
      error,
      StatusCodes.BAD_REQUEST
    );
  }

  public static INVALID_NUMBER(error: string) {
    return new Exception(
      ExceptionMessages.INVALID_NUMBER,
      error,
      StatusCodes.BAD_REQUEST
    );
  }

  public static INVALID_DATE(error: string) {
    return new Exception(
      ExceptionMessages.INVALID_DATE,
      error,
      StatusCodes.BAD_REQUEST
    );
  }

  public static INVALID_EMAIL(error: string) {
    return new Exception(
      ExceptionMessages.INVALID_EMAIL,
      error,
      StatusCodes.BAD_REQUEST
    );
  }

  public static NOT_AUTHENTICATED(error: string) {
    return new Exception(
      ExceptionMessages.NOT_AUTHENTICATED,
      error,
      StatusCodes.UNAUTHORIZED
    );
  }

  public static USER_NOT_FOUND(error: string) {
    return new Exception(
      ExceptionMessages.USER_NOT_FOUND,
      error,
      StatusCodes.NOT_FOUND
    );
  }

}
