import { Router } from 'express';
import {
  cardIdParamsValidator,
  deleteCard,
  deleteLike,
  getCards,
  postCard,
  postCardValidator,
  putLike,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);

cardsRouter.post('/', postCardValidator, postCard);

cardsRouter.delete('/:cardId', cardIdParamsValidator, deleteCard);

cardsRouter.put('/:cardId/likes', cardIdParamsValidator, putLike);

cardsRouter.delete('/:cardId/likes', cardIdParamsValidator, deleteLike);

export default cardsRouter;
