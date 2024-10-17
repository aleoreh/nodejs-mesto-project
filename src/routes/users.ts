import { celebrate } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import {
  getAuthorizatedUser,
  getUser,
  getUsers,
  patchUser,
  patchUserAvatar,
} from '../controllers/users';

export const passwordJoiSchema = Joi.string().required().min(3).messages({
  'string.min': 'Длина пароля должна быть более двух символов',
  'string.empty': 'Пароль не должен быть пустым',
});
export const emailJoiSchema = Joi.string().required().email().messages({
  'string.email': 'Должен быть введён корректный email',
  'string.empty': 'email не должен быть пустым',
});
export const uriJoiSchema = Joi.string()
  .uri()
  .message('Адрес должен быть корректным');

export const signinValidator = celebrate({
  body: Joi.object().keys({
    email: emailJoiSchema,
    password: passwordJoiSchema,
  }),
});

export const createUserValidator = celebrate({
  body: {
    name: Joi.string().optional(),
    about: Joi.string().optional(),
    avatar: uriJoiSchema.optional(),
    email: emailJoiSchema,
    password: passwordJoiSchema,
  },
});

export const patchUserValidator = celebrate({
  body: {
    name: Joi.string(),
    about: Joi.string(),
  },
});

export const patchUserAvatarValidator = celebrate({
  body: {
    avatar: uriJoiSchema,
  },
});

export const userIdValidator = celebrate({
  params: {
    userId: Joi.string(),
  },
});

const usersRouter = Router();

usersRouter.get('/', getUsers);

usersRouter.get('/me', userIdValidator, getAuthorizatedUser);

usersRouter.get('/:userId', userIdValidator, getUser);

usersRouter.patch('/me', patchUserValidator, patchUser);

usersRouter.patch('/me/avatar', patchUserAvatarValidator, patchUserAvatar);

export default usersRouter;
