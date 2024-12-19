import { StatusCodes } from 'http-status-codes';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

class MethodNotAllowedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.METHOD_NOT_ALLOWED;
  }
}

export default MethodNotAllowedError;
