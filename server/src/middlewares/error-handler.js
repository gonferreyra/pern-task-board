import { ZodError } from 'zod';
import logger from '../config/logger.js';
import { clearAuthenticationCookies } from '../utils/cookies.js';

const handleZodError = (res, err) => {
  const errors = err.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));
  return res.status(400).json({
    // message: err.message,
    errors,
  });
};

const errorHandlerMiddleware = (err, req, res, next) => {
  // logger
  logger.error(
    `Error - METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}]`
  );
  // If the error is an instance of CustomError, we use the custom statusCode, otherwise it defaults to 500.
  const statusCode = err.isCustom ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  if (err instanceof ZodError) {
    return handleZodError(res, err);
  }

  // delete cookies if the path is /auth/refresh
  if (req.path === '/auth/refresh') {
    clearAuthenticationCookies(res);
  }

  res.status(statusCode).json({
    error: message,
  });
};

export default errorHandlerMiddleware;
