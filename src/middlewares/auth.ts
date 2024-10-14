import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import UnauthorizedError from '../errors/unauthorized-error';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const { SECRET_KEY } = process.env;

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // TODO: проверка на наличие этой переменной проходит при старте приложения; придумать способ передавать её в приложение
  if (!SECRET_KEY) throw new Error('no secret');

  if (!req.cookies?.auth || !req.cookies.auth.startsWith('Bearer '))
    throw new UnauthorizedError('Пользователь не авторизован');

  const { token: auth } = req.cookies;
  const token = auth.replace('Bearer ', '');
  const payload = jwt.verify(token, SECRET_KEY);
  res.locals.user = payload;
  next();
}

export default authMiddleware;
