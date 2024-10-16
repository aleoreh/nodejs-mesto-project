import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-error';

const UNAUTHORIZED_MESSAGE = 'Пользователь не авторизован';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies?.token) throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);

  const { token } = req.cookies;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    res.locals.user = payload;
  } catch (err) {
    throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
  }

  return next();
}

export default authMiddleware;
