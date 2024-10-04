import { ErrorRequestHandler } from "express";
import { Error } from "mongoose";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import { BadRequestError, NotFoundError } from "../errors";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

export const appErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Error.CastError || err instanceof Error.ValidationError) {
    next(new BadRequestError("Переданы некорректные данные"));
  } else if (err instanceof Error.DocumentNotFoundError) {
    next(new NotFoundError("Объект не найден"));
  } else {
    next(err);
  }
};

export const finalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
};
