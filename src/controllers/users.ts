import { Request, Response } from "express";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import { createUser, getUser, getUsers } from "../services/users";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

export function usersGet(req: Request, res: Response) {
  getUsers()
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
}

export function userGet(req: Request, res: Response) {
  getUser(req.params.userId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
}

export function userPost(req: Request, res: Response) {
  createUser(req.body)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
}
