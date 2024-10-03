// app.ts — входной файл
import express from "express";
import mongoose from "mongoose";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import usersRouter from "./routes/users";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", usersRouter);

app.listen(3000);
