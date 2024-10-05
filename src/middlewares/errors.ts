import { ErrorRequestHandler } from "express";
import { Error as MongooseError } from "mongoose";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import { BadRequestError, NotFoundError } from "../errors";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

export const appErrorHandler: ErrorRequestHandler = (err, _req, _res, next) => {
  if (
    typeof err.message === "string" &&
    err.message.startsWith("E11000") &&
    err.keyValue
  ) {
    return next(
      new BadRequestError(`Поле ${JSON.stringify(err.keyValue)} не уникально`)
    );
  }

  if (err instanceof MongooseError.DocumentNotFoundError) {
    return next(new NotFoundError("Документ не найден"));
  }

  if (
    err instanceof MongooseError.CastError ||
    err instanceof MongooseError.ValidationError
  ) {
    return next(new BadRequestError("Переданы некорректные данные"));
  }

  return next(err);
};

export const finalErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  next
) => {
  const { statusCode = 500, message } = err;

  return res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });

  // fix no-unused-var
  next()
};
