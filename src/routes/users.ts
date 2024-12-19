import { Router } from 'express';
import {
  getAuthorizatedUser,
  getUser,
  getUsers,
  patchUser,
  patchUserAvatar,
} from '../controllers/users';
import {
  patchUserAvatarValidator,
  patchUserValidator,
  userIdValidator,
} from './validation';

const usersRouter = Router();

usersRouter.get('/', getUsers);

usersRouter.get('/me', userIdValidator, getAuthorizatedUser);

usersRouter.get('/:userId', userIdValidator, getUser);

usersRouter.patch('/me', patchUserValidator, patchUser);

usersRouter.patch('/me/avatar', patchUserAvatarValidator, patchUserAvatar);

export default usersRouter;
