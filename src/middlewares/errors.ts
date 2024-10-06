import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Error as MongooseError } from 'mongoose';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import BadRequestError from '../errors/bad-request-error';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const DEFAULT_ERROR_MESSAGE = 'На сервере произошла ошибка';
const INCORRECT_DATA_ERROR_MESSAGE = 'Переданы некорректные данные';

export const appErrorHandler: ErrorRequestHandler = (err, _req, _res, next) => {
  if (
    err instanceof MongooseError.CastError ||
    err instanceof MongooseError.ValidationError
  ) {
    return next(new BadRequestError(INCORRECT_DATA_ERROR_MESSAGE));
  }

  return next(err);
};

export const finalErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  // eslint-disable-next-line no-unused-vars
  next,
) => {
  const { statusCode = StatusCodes.INTERNAL_SERVER_ERROR, message } = err;

  return res.status(statusCode).send({
    message:
      statusCode === StatusCodes.INTERNAL_SERVER_ERROR
        ? DEFAULT_ERROR_MESSAGE
        : message,
  });
};
