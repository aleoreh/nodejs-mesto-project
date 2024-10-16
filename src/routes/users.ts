import { Router } from 'express';
import {
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

usersRouter.get('/:userId', userIdValidator, getUser);

usersRouter.patch('/me', patchUserValidator, patchUser);

usersRouter.patch('/me/avatar', patchUserAvatarValidator, patchUserAvatar);

export default usersRouter;
