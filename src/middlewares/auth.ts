import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import UnauthorizedError from '../errors/unauthorized-error';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies?.auth || !req.cookies.auth.startsWith('Bearer '))
    throw new UnauthorizedError('Пользователь не авторизован');

  const { token: auth } = req.cookies;
  const token = auth.replace('Bearer ', '');
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  res.locals.user = payload;
  next();
}

export default authMiddleware;
