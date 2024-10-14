import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import NotFoundError from '../errors/not-found-error';
import User from '../models/user';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const USER_NOT_FOUND_MESSAGE = 'Пользователь не найден';
const INCORRECT_LOGIN_MESSAGE = 'Неправильная почта или пароль';
const CORRECT_LOGIN_MESSAGE = 'ok';
const WEEK_IN_MILLISECONDS = 1 * 1000 * 3600 * 24 * 7;

const { SECRET_KEY } = process.env;

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

export function createUser(req: Request, res: Response, next: NextFunction) {
  const {
    name = undefined,
    about = undefined,
    avatar = undefined,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({
        name,
        about,
        avatar,
        email,
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
  // TODO: проверка на наличие этой переменной проходит при старте приложения; придумать способ передавать её в контроллер
  if (!SECRET_KEY) throw new Error('no secret');

  const { email, password } = req.body;
  User.findOne({ email })
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
      const token = jwt.sign({ _id: user._id }, SECRET_KEY);
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        maxAge: WEEK_IN_MILLISECONDS,
      });
      res.send({ message: CORRECT_LOGIN_MESSAGE });
    })
    .catch(next);
}
