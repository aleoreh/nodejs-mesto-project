// app.ts — входной файл
import express from "express";
import mongoose from "mongoose";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import users from "./routes/users";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use("/users", users);

app.listen(3000);
