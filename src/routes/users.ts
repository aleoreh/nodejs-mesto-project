import { Router } from 'express';
import {
  getAuthorizatedUser,
  getUser,
  getUsers,
  patchUser,
  patchUserAvatar,
  patchUserAvatarValidator,
  patchUserValidator,
  userIdValidator,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);

usersRouter.get('/me', userIdValidator, getAuthorizatedUser);

usersRouter.get('/:userId', userIdValidator, getUser);

usersRouter.patch('/me', patchUserValidator, patchUser);

usersRouter.patch('/me/avatar', patchUserAvatarValidator, patchUserAvatar);

export default usersRouter;
