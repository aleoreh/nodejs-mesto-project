import { Request, Response } from "express";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import User from "../models/user";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

export function getUsers(req: Request, res: Response) {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
}

export function getUser(req: Request, res: Response) {
  User.find({ _id: req.params.userId })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
}

export function postUser(req: Request, res: Response) {
  User.create(req.body)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
}

export function patchUser(req: Request, res: Response) {
  User.findByIdAndUpdate((req as any).user._id, req.body)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
}
