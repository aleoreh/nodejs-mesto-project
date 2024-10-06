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
  const { name, link } = req.body;

  const cardData = {
    name,
    link,
    owner: res.locals.user._id,
    // timestamps устанавливаются с помощью опции timestamps: true
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
      $addToSet: { likes: res.locals.user._id },
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
      $pull: { likes: res.locals.user._id },
    },
    { new: true }
  )
    .then((card) => {
      if (!card) throw new NotFoundError("Карточка не найдена");
      res.send(card);
    })
    .catch(next);
}
