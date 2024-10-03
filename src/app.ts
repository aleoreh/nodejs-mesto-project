// app.ts — входной файл
import express, { NextFunction, Response } from "express";
import mongoose from "mongoose";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import cardsRouter from "./routes/cards";
import usersRouter from "./routes/users";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req: any, res: Response, next: NextFunction) => {
  req.user = {
    _id: "66fed2e62bbb9b3333727836",
  };

  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.listen(3000, () => {
  console.log("Listens on port 3000");
});
