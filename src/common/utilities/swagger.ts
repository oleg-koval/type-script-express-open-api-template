import { Express } from 'express';
import * as swagger from 'swagger-express-middleware';
import { promisify } from 'util';

const swaggerAsync = promisify(swagger);

export const initializeSwagger = async (
  expressApp: Express,
  specificationPath: string,
): Promise<swagger.SwaggerMiddleware> =>
  swaggerAsync(specificationPath, expressApp);
