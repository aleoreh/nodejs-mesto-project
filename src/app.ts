// app.ts — входной файл
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { createUser, login } from './controllers/users';
import authMiddleware from './middlewares/auth';
import errorLogger from './middlewares/error-logger';
import { appErrorHandler, finalErrorHandler } from './middlewares/errors';
import cardsRouter from './routes/cards';
import notFoundRouter from './routes/not-found';
import usersRouter from './routes/users';

const {
  DATABASE_PATH = 'mongodb://127.0.0.1:27017/mestodb',
  JWT_SECRET,
} = process.env;

function run() {
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());

  app.use('/signin', login);
  app.use('/signup', createUser);

  app.use(authMiddleware);

  app.use('/users', usersRouter);
  app.use('/cards', cardsRouter);
  app.use('*', notFoundRouter);

  app.use(appErrorHandler);
  app.use(errorLogger);
  app.use(finalErrorHandler);

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
}

if (!JWT_SECRET) {
  console.log('Необходимо задать переменную JWT_SECRET');
} else {
  mongoose
    .connect(DATABASE_PATH)
    .then(run)
    .catch(() => {
      console.log(`Не удалось подключиться к базе данных ${DATABASE_PATH}`);
    });
}
