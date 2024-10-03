import { Router } from "express";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const usersRouter = Router();

usersRouter.get("/", (req, res) => {

});

usersRouter.get("/:userId", (req, res) => {
  res.send(req.params.userId);
});

usersRouter.post("/", (req, res) => {
  res.send(req.body);
});

export default usersRouter;
