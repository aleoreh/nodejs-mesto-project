import { Request, Response } from "express";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import Card from "../models/card";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

export function getCards(req: Request, res: Response) {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(() => res.status(500).send("Произошла ошибка"));
}

export function postCard(req: Request, res: Response) {
  Card.create(req.body)
    .then((card) => {
      res.send({ data: { ...card, owner: (req as any).user } });
    })
    .catch(() =>
      res.status(500).send({
        message: "Произошла ошибка",
      })
    );
}

export function deleteCard(req: Request, res: Response) {
  Card.deleteOne({ _id: req.params.cardId })
    .then(() => {
      res.status(200);
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
}
