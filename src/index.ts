import { PORT } from './config';
import { logError } from './logging';
import { createServer, ExpressApp } from './server';

createServer({
  specificationPath: '/open-api/specification.yaml',
})
  .then((server: ExpressApp): void => {
    server.start(PORT);
  })
  .catch((error: Error): void => {
    logError(error);

    throw error;
  });
