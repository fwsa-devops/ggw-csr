import logger from "@/lib/logger";
import { Exception } from "../exceptions/exception";

export class CommonValidator {
  public static ID(_value: string | null | undefined): void {
    if (!_value) {
      throw Exception.INVALID_ID("Invalid id");
    }
    const value = _value.trim();
    if (!value || value.length === 0) {
      throw Exception.INVALID_ID("Invalid id");
    }

    // CUID validation
    const pattern = /^[cC][a-zA-Z0-9]{24}$/;
    if (!pattern.test(value)) {
      throw Exception.INVALID_ID("Invalid id");
    }
  }

  public static STRING(_value: string | null | undefined): void {
    if (!_value) {
      throw Exception.INVALID_STRING("Invalid string");
    }
    const value = _value.trim();
    if (!value || value.length === 0) {
      throw Exception.INVALID_STRING("Invalid string");
    }
  }

  public static NUMBER(_value: number | null | undefined): void {
    if (!_value) {
      throw Exception.INVALID_NUMBER("Invalid number");
    }
    const value = _value;
    if (!value || value < 0) {
      throw Exception.INVALID_NUMBER("Invalid number");
    }
  }

  public static EMAIL(email: string | null | undefined) {
    CommonValidator.STRING(email);
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(email!)) {
      throw Exception.INVALID_EMAIL("Invalid email id");
    }
  }

  public static DATE(date: Date | null | undefined) {
    if (!date) {
      throw Exception.INVALID_DATE("Invalid date");
    }
  }

  public static INPUT(
    key: string,
    _value: string | number | Date | null | undefined,
  ) {
    // check the type of the value and call the necessary function and throw custom error
    try {
      if (typeof _value === "string") {
        CommonValidator.STRING(_value);
      } else if (typeof _value === "number") {
        CommonValidator.NUMBER(_value);
      } else if (_value instanceof Date) {
        CommonValidator.DATE(_value);
      } else {
        throw Exception.INVALID_STRING("Invalid input");
      }
    } catch (error: unknown) {
      logger.error(JSON.stringify(error, null, 2));

      if (error instanceof Error) {
        throw Exception.INVALID_INPUT(error.message);
      }

      throw error;
    }
  }
}
