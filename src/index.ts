import { PORT } from './config';
import { logError } from './logging';
import { createServer, ExpressApp } from './server';

export const createdServer = createServer({
  specificationPath: '/open-api/specification.yaml',
})
  .then((server: ExpressApp): unknown => server.start(PORT))
  .catch((error: Error): unknown => {
    const errorLog = logError(error);

    return errorLog;
  });
