import { clearAuthenticationCookies } from '../utils/cookies.js';

const errorHandlerMiddleware = (err, req, res, next) => {
  // If the error is an instance of CustomError, we use the custom statusCode, otherwise it defaults to 500.
  const statusCode = err.isCustom ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  // delete cookies if the path is /auth/refresh
  if (req.path === '/auth/refresh') {
    clearAuthenticationCookies(res);
  }

  res.status(statusCode).json({
    error: message,
  });
};

export default errorHandlerMiddleware;
