import { logError } from './logging/index';
import * as express from 'express';
import { Server } from 'http';
import { join } from 'path';

import { initializeSwagger } from './common/utilities/swagger';
import { errorHandler } from './middleware/errorHandler';
import { Router } from './routes';

/**
 * Assert that the port is a numeric value contained within bounds.
 * Non-privileged user (not root) can't open a listening socket on ports below 1024.
 */
const assertValidPort = (port: number): boolean => {
  return Number.isSafeInteger(port) && port >= 1024 && port <= 65535;
};

export type ExpressApp = {
  readonly expressApp: express.Express;
  readonly shutdown: (server: Server) => Server; // eslint-disable-line functional/no-mixed-type
  readonly start: (port: number) => Server | null;
};

/**
 * Creates the server.
 */
export const createServer = async (options: {
  readonly specificationPath: string;
}): Promise<ExpressApp> => {
  const expressApp = express();

  const swagger = await initializeSwagger(
    expressApp,
    join(process.cwd(), options.specificationPath),
  );

  const middleware = [
    swagger.metadata(),
    swagger.CORS(),
    swagger.parseRequest(),
    swagger.validateRequest(),
    Router,
    errorHandler,
  ];

  middleware.forEach(middleware => expressApp.use(middleware)); // eslint-disable-line functional/no-expression-statement

  return {
    expressApp,
    shutdown: (server: Server): Server => {
      return server.close();
    },
    start: (port: number): Server | null => {
      return assertValidPort(port) === false // eslint-disable-line functional/no-expression-statement
        ? logError('Invalid PORT or out of bounds.')
        : expressApp.listen(port);
    },
  };
};
