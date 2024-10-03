import { Router } from "express";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import { userGet, userPost, usersGet } from "../controllers/users";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
  usersGet(req, res);
});

usersRouter.get("/:userId", (req, res) => {
  userGet(req, res);
});

usersRouter.post("/", (req, res) => {
  userPost(req, res);
});

export default usersRouter;
