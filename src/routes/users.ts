import { Router } from "express";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const users = Router();

users.get("/", (req, res) => {
  res.send("/users");
});

users.get("/:userId", (req, res) => {
  res.send(req.params.userId);
});

users.post("/", (req, res) => {
  res.send(req.body);
});

export default users;
