import { Router } from "express";

const cardsRouter = Router();

cardsRouter.get("/", (req, res) => {
  res.send("GET /cards");
});

cardsRouter.post("/", (req, res) => {
  res.send("POST /cards");
});

cardsRouter.delete("/:cardId", (req, res) => {
  res.send(`DELETE /cards/${req.params.cardId}`);
});

export default cardsRouter;
