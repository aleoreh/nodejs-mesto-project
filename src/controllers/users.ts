import { NextFunction, Request, Response } from "express";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import { NotFoundError } from "../errors";
import User from "../models/user";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

export function getUsers(req: Request, res: Response, next: NextFunction) {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
}

export function getUser(req: Request, res: Response, next: NextFunction) {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) throw new NotFoundError(`Пользователь не найден`);
      res.send(user);
    })
    .catch(next);
}

export function postUser(req: Request, res: Response, next: NextFunction) {
  User.create(req.body)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
}

export function patchUser(req: Request, res: Response, next: NextFunction) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (req as any).user._id;
  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((user) => {
      if (!user) throw new NotFoundError(`Пользователь не найден`);
      res.send(user);
    })
    .catch(next);
}

export function patchUserAvatar(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (req as any).user._id;
  User.findByIdAndUpdate(userId, { avatar: req.body.avatar }, { new: true })
    .then((user) => {
      if (!user) throw new NotFoundError(`Пользователь не найден`);
      res.send(user);
    })
    .catch(next);
}
