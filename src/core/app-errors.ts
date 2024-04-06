import { ErrorCode } from "../common/enums";

export class ApiError extends Error {
  readonly code: number;
  readonly message: string;
  readonly details: string[];
  readonly errorCode: ErrorCode;

  constructor(code: number, message: string, details: string[] = [], errorCode: ErrorCode, ...args: any[]) {
    super(message, ...args);
    this.code = code;
    this.message = message;
    this.details = details;
    this.errorCode = errorCode;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string, details: string[] = []) {
    super(400, message, details, ErrorCode.BAD_REQUEST);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string, details: string[] = []) {
    super(401, message, details, ErrorCode.UNAUTHORIZED);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string, details: string[] = []) {
    super(403, message, details, ErrorCode.FORBIDDEN);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, details: string[] = []) {
    super(404, message, details, ErrorCode.NOT_FOUND);
  }
}

export class InternalError extends ApiError {
  constructor(message: string, details: string[] = []) {
    super(500, message, details, ErrorCode.INTERNAL_SERVER_ERROR);
  }
}
