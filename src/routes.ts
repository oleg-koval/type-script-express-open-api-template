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

Router.get(PathsMapping.health, healthController);
Router.get(PathsMapping.greeter, validateGreeterRequest, greeterController);

export { Router };
