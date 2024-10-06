import { NotFoundError } from "../errors/not-found-error";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

export function notFound() {
  throw new NotFoundError("Такой страницы не существует");
}