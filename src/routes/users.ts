import { Router } from 'express';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import {
  getUser,
  getUsers,
  patchUser,
  patchUserAvatar,
} from '../controllers/users';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const usersRouter = Router();

usersRouter.get('/', getUsers);

usersRouter.get('/:userId', getUser);

usersRouter.patch('/me', patchUser);

usersRouter.patch('/me/avatar', patchUserAvatar);

export default usersRouter;
