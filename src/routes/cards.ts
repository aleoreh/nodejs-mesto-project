import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import {
  deleteCard,
  deleteLike,
  getCards,
  postCard,
  putLike,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);

cardsRouter.post(
  '/',
  celebrate({
    body: Joi.object({
      name: Joi.string(),
      link: Joi.string().uri(),
    }),
  }),
  postCard,
);

cardsRouter.delete('/:cardId', deleteCard);

cardsRouter.put('/:cardId/likes', putLike);

cardsRouter.delete('/:cardId/likes', deleteLike);

export default cardsRouter;
