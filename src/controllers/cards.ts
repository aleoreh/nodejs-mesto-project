import { NextFunction, Request, Response } from "express";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import Card from "../models/card";
import { NotFoundError } from "../errors";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

export function getCards(req: Request, res: Response, next: NextFunction) {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
}

export function postCard(req: Request, res: Response, next: NextFunction) {
  const cardData = {
    ...req.body,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    owner: (req as any).user._id,
    createdAt: new Date(),
  };

  Card.create(cardData)
    .then((card) => {
      res.send(card);
    })
    .catch(next);
}

export function deleteCard(req: Request, res: Response, next: NextFunction) {
  const cardId = req.params.cardId;
  Card.deleteOne({ _id: cardId })
    .then(() => {
      res.send();
    })
    .catch(next);
}

export function putLike(req: Request, res: Response, next: NextFunction) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $addToSet: { likes: (req as any).user._id },
    },
    { new: true }
  )
    .then((card) => {
      if (!card) throw new NotFoundError("Карточка не найдена");
      res.send(card);
    })
    .catch(next);
}

export function deleteLike(req: Request, res: Response, next: NextFunction) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $pull: { likes: (req as any).user._id },
    },
    { new: true }
  )
    .then((card) => {
      if (!card) throw new NotFoundError("Карточка не найдена");
      res.send(card);
    })
    .catch(next);
}
