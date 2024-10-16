import { celebrate } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import {
  deleteCard,
  deleteLike,
  getCards,
  postCard,
  putLike,
} from '../controllers/cards';

export const cardIdParamsValidator = celebrate({
  params: {
    cardId: Joi.string(),
  },
});

export const postCardValidator = celebrate({
  body: Joi.object({
    name: Joi.string(),
    link: Joi.string().uri(),
  }),
});

const cardsRouter = Router();

cardsRouter.get('/', getCards);

cardsRouter.post('/', postCardValidator, postCard);

cardsRouter.delete('/:cardId', cardIdParamsValidator, deleteCard);

cardsRouter.put('/:cardId/likes', cardIdParamsValidator, putLike);

cardsRouter.delete('/:cardId/likes', cardIdParamsValidator, deleteLike);

export default cardsRouter;
