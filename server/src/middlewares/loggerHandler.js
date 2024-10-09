import logger from '../config/logger.js';

export function loggerMiddleware(req, res, next) {
  const start = Date.now();
  const originalSend = res.send;

  res.send = (data) => {
    const duration = Date.now() - start;
    const response = {
      method: req.method,
      url: req.url,
      ip: req.socket.remoteAddress,
      status: res.statusCode,
      duration,
    };

    if (data) {
      response.data = data;
    }

    logger.info(
      `Incoming - METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}]`
    );

    originalSend.call(res, data);
  };

  next();
}
