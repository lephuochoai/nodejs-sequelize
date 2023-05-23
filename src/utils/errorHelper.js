export const ERROR_CODE = {};

export const HTTP_ERROR = Object.freeze({
  ACCESS_DENIED: 403,
  NOT_FOUND: 404,
  TIME_OUT: 402,
  BAD_REQUEST: 400,
  NOT_AUTHENTICATE: 401,
  INTERNAL_SERVER_ERROR: 500,
});

export class HttpError extends Error {
  constructor(code, message, info) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.code = code;
    this.info = info;
  }
}

export class FormError extends HttpError {
  constructor(_errors) {
    super(HTTP_ERROR.BAD_REQUEST, 'Bad request');
    this.errors = array.concat([], _errors);
  }
}

export class FieldError {
  constructor(name, code, message) {
    this.name = name;
    this.code = code;
    this.message = message;
  }
}

export function badRequest(name, code, message) {
  return new FormError(new FieldError(name, code, message));
}
