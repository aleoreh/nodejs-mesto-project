import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import NotFoundError from '../errors/not-found-error';
import User from '../models/user';

const USER_NOT_FOUND_MESSAGE = 'Пользователь не найден';
const INCORRECT_LOGIN_MESSAGE = 'Неправильная почта или пароль';
const CORRECT_LOGIN_MESSAGE = 'ok';
const WEEK_IN_MILLISECONDS = 1 * 1000 * 3600 * 24 * 7;

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

export function getAuthorizatedUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = res.locals.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      res.send(user);
    })
    .catch(next);
}

export function createUser(req: Request, res: Response, next: NextFunction) {
  // TODO: типизировать body
  const userData = req.body;
  bcrypt
    .hash(userData.password, 10)
    .then((hashedPassword) =>
      User.create({
        ...userData,
        password: hashedPassword,
      }),
    )
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

export function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError(INCORRECT_LOGIN_MESSAGE);
      }
      return Promise.all([
        user,
        bcrypt.compare(password, user.password),
      ]) as Promise<[typeof user, boolean]>;
    })
    .then(([user, matched]) => {
      if (!matched) {
        throw new NotFoundError(INCORRECT_LOGIN_MESSAGE);
      }
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET as string,
      );
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: WEEK_IN_MILLISECONDS,
        })
        .send({ message: CORRECT_LOGIN_MESSAGE });
    })
    .catch(next);
}
