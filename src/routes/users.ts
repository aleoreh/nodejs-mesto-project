import { Router } from "express";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import { getUser, postUser, getUsers, patchUser } from "../controllers/users";

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

export default usersRouter;
