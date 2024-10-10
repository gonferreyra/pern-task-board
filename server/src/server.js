import express from 'express';
import 'dotenv/config';
import { loggerMiddleware } from './middlewares/logger-handler.js';
import logger from './config/logger.js';
import { SERVER_HOSTNAME, SERVER_PORT } from './constants/env.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';
import dbConnection from './config/db.js';

const app = express();

const Main = async () => {
  // URL - reading and parsing body
  app.use(express.urlencoded({ extended: true }));
  // JSON - reading and parsing body
  app.use(express.json());

  // db connection
  await dbConnection().then(() => logger.info('DB Connected successfully'));
  // Routes
  app.get('/', (req, res) => {
    res.status(200).send('Get request OK');
  });

  // Middelwares
  app.use(loggerMiddleware);
  app.use(errorHandlerMiddleware);

  app.listen(SERVER_PORT, async () => {
    logger.info(`Server Started from ${SERVER_HOSTNAME}:${SERVER_PORT}`);
  });
};

Main();
