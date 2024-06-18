import { CustomError } from "./customError.js";

class ClientError extends CustomError {
  constructor(message) {
    super(message, 400);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message, 401);
  }
}

class ForbiddenError extends CustomError {
  constructor(message) {
    super(message, 403);
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(message, 404);
  }
}

class ServerError extends CustomError {
  constructor(message) {
    super(message, 500);
  }
}
export default {
  ClientError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ServerError,
};
