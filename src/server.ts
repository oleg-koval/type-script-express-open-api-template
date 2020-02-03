import * as express from 'express';
import { Server } from 'http';
import { join } from 'path';

import { initializeSwagger } from './common/utilities/swagger';
import { errorHandler } from './middleware/errorHandler';
import { Router } from './routes';

/**
 * Assert that the port is a numeric value contained within bounds.
 */
const assertValidPort = (port: number): boolean => {
  return Number.isSafeInteger(port) && port >= 0 && port <= 65535;
};

export interface ExpressApp {
  readonly expressApp: express.Express;
  readonly shutdown: (server: Server) => Server;
  readonly start: (port: number) => Server;
}

/**
 * Creates the server.
 */
export const createServer = async (options: {
  specificationPath: string;
}): Promise<ExpressApp> => {
  const expressApp = express();

  const swagger = await initializeSwagger(
    expressApp,
    join(process.cwd(), options.specificationPath),
  );

  expressApp.use(swagger.metadata());
  expressApp.use(swagger.CORS());
  expressApp.use(swagger.parseRequest());
  expressApp.use(swagger.validateRequest());

  expressApp.use(Router);
  expressApp.use(errorHandler);

  return {
    expressApp,
    shutdown: (server: Server): Server => {
      return server.close();
    },
    start: (port: number): Server => {
      if (assertValidPort(port) === false) {
        throw new Error('Invalid PORT or out of bounds.');
      }

      return expressApp.listen(port);
    },
  };
};
