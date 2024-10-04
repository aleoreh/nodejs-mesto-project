import { Router } from "express";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import {
  deleteCard,
  deleteLike,
  getCards,
  postCard,
  putLike,
} from "../controllers/cards";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const cardsRouter = Router();

cardsRouter.get("/", (req, res) => {
  getCards(req, res);
});

cardsRouter.post("/", (req, res) => {
  postCard(req, res);
});

cardsRouter.delete("/:cardId", (req, res) => {
  deleteCard(req, res);
});

cardsRouter.put("/:cardId/likes", (req, res) => {
  putLike(req, res);
});

cardsRouter.delete("/:cardId/likes", (req, res) => {
  deleteLike(req, res);
});

export default cardsRouter;
