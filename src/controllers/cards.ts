import { NextFunction, Request, Response } from 'express';
import { UpdateQuery } from 'mongoose';
import ForbiddenError from '../errors/forbidden-error';
import MethodNotAllowedError from '../errors/method-not-allowed-error';
import NotFoundError from '../errors/not-found-error';
import Card, { ICard } from '../models/card';

const CARD_NOT_FOUND_MESSAGE = 'Карточка не найдена';
const CARD_DELETED = 'Карточка удалена';
const FORBIDDEN_ERROR_MESSAGE = 'Доступ запрещён';

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
  const { cardId } = req.params;

  Card.findById({ _id: cardId })
    .then((card) => {
      if (!card) throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
      if (!card.owner._id.equals(res.locals.user._id))
        throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE);
      Card.deleteOne({ _id: card._id });
      res.send({ message: CARD_DELETED });
    })
    .catch(next);
}

export function updateLike(req: Request, res: Response, next: NextFunction) {
  if (!['PUT', 'DELETE'].includes(req.method)) {
    throw new MethodNotAllowedError(
      `Данный метод (${req.method}) не поддерживается`,
    );
  }
  const updateQuery: UpdateQuery<ICard> =
    req.method === 'PUT'
      ? { $addToSet: { likes: res.locals.user._id } }
      : { $pull: { likes: res.locals.user._id } };
  Card.findByIdAndUpdate(req.params.cardId, updateQuery, {
    new: true,
    runValidators: true,
  })
    .then((card) => {
      if (!card) throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
      res.send(card);
    })
    .catch(next);
}
