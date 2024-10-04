import { Error } from "mongoose";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import { BadRequestError } from "./errors";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

export function handleBadRequestError(err: unknown) {
  if (err instanceof Error.CastError || err instanceof Error.ValidationError) {
    throw new BadRequestError("Переданы некорректные данные");
  }

  throw err;
}
