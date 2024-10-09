import express from 'express';
import 'dotenv/config';
import { loggerMiddleware } from './middlewares/loggerHandler.js';
import logger from './config/logger.js';
import { SERVER_HOSTNAME, SERVER_PORT } from './constants/env.js';

const app = express();

const Main = () => {
  // URL - reading and parsing body
  app.use(express.urlencoded({ extended: true }));
  // JSON - reading and parsing body
  app.use(express.json());

  // Middelwares
  app.use(loggerMiddleware);
  console.log(process.env.PORT);

  app.listen(SERVER_PORT, () => {
    logger.info(`Server Started from ${SERVER_HOSTNAME}:${SERVER_PORT}`);
  });
};

Main();
