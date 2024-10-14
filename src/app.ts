// app.ts — входной файл
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import { appErrorHandler, finalErrorHandler } from './middlewares/errors';
import errorLogger from './middlewares/logger';
import cardsRouter from './routes/cards';
import notFoundRouter from './routes/not-found';
import usersRouter from './routes/users';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import 'dotenv/config'

const {
  DATABASE_PATH = 'mongodb://127.0.0.1:27017/mestodb',
  FAKE_USER_ID = '6700b51ab22ca627e5be4361',
  SECRET_KEY,
} = process.env;

function run() {
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.user = {
      _id: FAKE_USER_ID,
    };

    next();
  });

  app.use('/users', usersRouter);
  app.use('/cards', cardsRouter);
  app.use('*', notFoundRouter);

  app.use(appErrorHandler);
  app.use(errorLogger);
  app.use(finalErrorHandler);

  app.listen(3000, () => {
    console.log('Listening on port 3000');
    console.log(`User: ${FAKE_USER_ID}`);
  });
}

if (!SECRET_KEY) {
  console.log('Необходимо задать переменную SECRET_KEY');
} else {
  mongoose
    .connect(DATABASE_PATH)
    .then(run)
    .catch(() => {
      console.log(`Не удалось подключиться к базе данных ${DATABASE_PATH}`);
    });
}
