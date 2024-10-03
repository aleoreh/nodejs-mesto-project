import { Router } from "express";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import userModel from "../models/user";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
  userModel
    .find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
});

usersRouter.get("/:userId", (req, res) => {
  userModel
    .find({ _id: req.params.userId })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
});

usersRouter.post("/", (req, res) => {
  const { name, about, avatar } = req.body;

  userModel
    .create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
});

export default usersRouter;
