import { Environment } from './config/environment';
import server from './server/app';
import { logger } from './helpers/logger';
Environment.setup();
import 'reflect-metadata';

import { Application } from 'express';

import { config } from './config/config';

async function startServer(): Promise<Application> {
  const app: Application = await server.server();
  app.listen(config.SERVER_PORT, (): void => {
    console.log(`Listening on port ${config.SERVER_PORT} in ${config.NODE_ENV} mode`);
    logger.info(`Listening on port ${config.SERVER_PORT} in ${config.NODE_ENV} mode`);
  });

  return app;
}

export default startServer();
