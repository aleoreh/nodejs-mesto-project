import { Router } from "express";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import { deleteCard, getCards, postCard } from "../controllers/cards";

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

export default cardsRouter;
