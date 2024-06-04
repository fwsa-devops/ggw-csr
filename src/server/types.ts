import { type StatusCodes } from "http-status-codes";

export class IResponse<T> {
  public status: StatusCodes;
  public message: string;
  public description?: string;
  public data?: T;

  constructor(status: StatusCodes, message: string);
  constructor(status: StatusCodes, message: string, description: string);
  constructor(status: StatusCodes, message: string, data: T);
  constructor(
    status: StatusCodes,
    message: string,
    descriptionOrData?: string | T,
    data?: T
  ) {
    this.status = status;
    this.message = message;

    if (typeof descriptionOrData === "string") {
      this.description = descriptionOrData;
    } else {
      this.data = descriptionOrData;
    }

    if (data) this.data = data;
  }

  static toJSON<U>(
    status: StatusCodes,
    message: string,
    descriptionOrData?: string | U,
    data?: U
  ): SerializableIResponse<U> {
    let description: string | undefined;
    let dataValue: U | undefined;

    if (typeof descriptionOrData === "string") {
      description = descriptionOrData;
    } else {
      dataValue = descriptionOrData;
    }

    if (data) dataValue = data;

    return {
      status,
      message,
      description,
      data: dataValue,
    };
  }
}

type SerializableIResponse<T> = {
  // __type: string;
  status: StatusCodes;
  data?: T;
  message: string;
  description?: string;
};
