import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { loggerMiddleware } from './middlewares/logger-handler.js';
import logger from './config/logger.js';
import { SERVER_HOSTNAME, SERVER_PORT } from './constants/env.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';
import dbConnection from './config/db.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

const app = express();

const Main = async () => {
  // URL - reading and parsing body
  app.use(express.urlencoded({ extended: true }));
  // JSON - reading and parsing body
  app.use(express.json());
  // cookie parser middleware
  app.use(cookieParser()); // parse cookies - req.cookies available
  app.use(
    cors({
      origin: '*',
      credentials: true,
    })
  );
  // Logger Middleware
  app.use(loggerMiddleware);

  // db connection
  await dbConnection().then(() => logger.info('DB Connected successfully'));
  // Routes
  app.get('/', (req, res) => {
    res.status(200).send('Get request OK');
  });

  // Authentication routes
  app.use('/auth', authRoutes);

  // Routes
  app.use('/user', userRoutes);

  // Error Middleware (always at the end)
  app.use(errorHandlerMiddleware);

  app.listen(SERVER_PORT, async () => {
    logger.info(`Server Started from ${SERVER_HOSTNAME}:${SERVER_PORT}`);
  });
};

Main();
