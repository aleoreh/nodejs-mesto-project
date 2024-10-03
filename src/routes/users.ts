import { Router } from "express";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import {
  getUser,
  postUser,
  getUsers,
  patchUser,
  patchUserAvatar,
} from "../controllers/users";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
  getUsers(req, res);
});

usersRouter.get("/:userId", (req, res) => {
  getUser(req, res);
});

usersRouter.post("/", (req, res) => {
  postUser(req, res);
});

usersRouter.patch("/me", (req, res) => {
  patchUser(req, res);
});

usersRouter.patch("/me/avatar", (req, res) => {
  patchUserAvatar(req, res);
});

export default usersRouter;
