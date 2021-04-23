import { Router as router } from 'express';

import { PathsMapping } from './config';
import {
  greeter as greeterController,
  health as healthController,
} from './controllers';
import { validateGreeterRequest } from './middleware/validation';

const Router = router({
  caseSensitive: true,
});

export const assignedHealthController = Router.get(
  PathsMapping.health,
  healthController,
);
export const assignedGreeterController = Router.get(
  PathsMapping.greeter,
  validateGreeterRequest,
  greeterController,
);

export { Router };
