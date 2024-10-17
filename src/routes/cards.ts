import { Router } from 'express';
import {
  deleteCard,
  getCards,
  postCard,
  updateLike,
} from '../controllers/cards';
import { cardIdParamsValidator, postCardValidator } from './validation';

const cardsRouter = Router();

cardsRouter.get('/', getCards);

cardsRouter.post('/', postCardValidator, postCard);

cardsRouter.delete('/:cardId', cardIdParamsValidator, deleteCard);

cardsRouter.put('/:cardId/likes', cardIdParamsValidator, updateLike);

cardsRouter.delete('/:cardId/likes', cardIdParamsValidator, updateLike);

export default cardsRouter;
