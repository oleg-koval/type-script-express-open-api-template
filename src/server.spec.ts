/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { PORT } from './config';
import { createServer } from './server';

/**
 * Utilities
 */

/*
 * Tests
 */

describe('error handling', (): void => {
  it.each([1, NaN, 65536, 99999])(
    'should throw an error when passed a port which is out of bounds: %d',
    async (port: number): Promise<void> => {
      expect.assertions(1);

      const { start } = await createServer({
        specificationPath: '/open-api/specification.yaml',
      });

      const started = start(port);

      expect(started).toBeNull();
    },
  );
});

describe('runtime', (): void => {
  it('starts the server when correct parameters are passed', async (): Promise<
    void
  > => {
    const { start, shutdown } = await createServer({
      specificationPath: '/open-api/specification.yaml',
    });
    const server = start(PORT);
    expect(server!.listening).toBe(true);

    shutdown(server!);
  });
});
