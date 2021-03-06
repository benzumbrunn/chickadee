import winston, { format } from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json(),
  ),
  defaultMeta: { service: 'chickadee' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error', maxsize: 10000000 }),
    new winston.transports.File({ filename: 'logs/all.log', maxsize: 10000000 }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
