import { NextFunction, Request, Response } from 'express';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import NotFoundError from '../errors/not-found-error';
import User from '../models/user';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const USER_NOT_FOUND_MESSAGE = 'Пользователь не найден';

export function getUsers(req: Request, res: Response, next: NextFunction) {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
}

export function getUser(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      res.send(user);
    })
    .catch(next);
}

export function postUser(req: Request, res: Response, next: NextFunction) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
}

export function patchUser(req: Request, res: Response, next: NextFunction) {
  const userId = res.locals.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      res.send(user);
    })
    .catch(next);
}

export function patchUserAvatar(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = res.locals.user._id;
  User.findByIdAndUpdate(
    userId,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      res.send(user);
    })
    .catch(next);
}
