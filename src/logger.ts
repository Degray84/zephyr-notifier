import pino from 'pino';
import { IS_PROD } from './config';

const logger = pino(
  IS_PROD
    ? {
        level: 'info',
        base: { service_name: 'zephyr-notifier' },
      }
    : {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            ignore: 'pid,hostname',
          },
        },
      },
);

export { logger };
