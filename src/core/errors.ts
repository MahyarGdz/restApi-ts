import {ErrorConstans} from '../constants/error';

export class ApplicationError extends Error {

  constructor(public code: number, public message: string, ...args:any[]) {
    super(...args);
  }
}

export class BadRequestError extends ApplicationError {
  constructor(message: string, ...args:any[]) {
    super(400, message, ...args);
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(message: string) {
    super(401, message);
  }
}

export class ForbiddenError extends ApplicationError {
  constructor(message: string, ...args:any[]) {
    super(403, message, args);
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string, ...args:any[]) {
    super(404, message, args);
  }
}

export class MissingFieldError extends BadRequestError {
  constructor(fieldName: string, ...args:any[]) {
    super(`${fieldName} is required`, args);
  }
}

export class InternalError extends ApplicationError {
  constructor(message: string, ...args:any[]) {
    super(500, message, args);
  }
}

export class InvalidIdError extends BadRequestError {
  constructor(...args:any[]) {
    super(ErrorConstans.REPOSITORY_ERROR_INVALID_ID, args);
  }
}

export class RepositoryMissingField extends BadRequestError {
  constructor(...args:any[]) {
    super('Field missing', args);
  }
}
