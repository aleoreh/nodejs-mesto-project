import { Request, Response } from "express";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import userModel from "../models/user";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

export function getUsers(req: Request, res: Response) {
  userModel
    .find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
}

export function getUser(req: Request, res: Response) {
  userModel
    .find({ _id: req.params.userId })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
}

export function postUser(req: Request, res: Response) {
  userModel
    .create(req.body)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
}
