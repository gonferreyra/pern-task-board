import { createLogger, format, transports } from 'winston';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.colorize(),
    format.simple(),
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss',
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'debug',
    }),
    new transports.File({
      maxsize: 512000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/server.log`,
    }),
  ],
});

export default logger;
