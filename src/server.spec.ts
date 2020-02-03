import { PORT } from './config';
import { createServer } from './server';

/*
 * Tests
 */

describe('error handling', (): void => {
  it('does not start when incorrect parameters are passed: NaN', async (): Promise<
    void
  > => {
    const { start } = await createServer({
      specificationPath: '/open-api/specification.yaml',
    });

    try {
      start(NaN);
    } catch (error) {
      expect(error).toMatchInlineSnapshot(
        `[Error: Invalid PORT or out of bounds.]`,
      );
    }
  });

  it('does not start when incorrect parameters are passed: out of bounds', async (): Promise<
    void
  > => {
    const { start } = await createServer({
      specificationPath: '/open-api/specification.yaml',
    });

    try {
      start(1);
    } catch (error) {
      expect(error).toMatchInlineSnapshot(
        `[Error: Invalid PORT or out of bounds.]`,
      );
    }
  });

  it.each([65536, 99999])(
    'should throw an error when passed a port which is out of bounds: %d',
    async (port: number): Promise<void> => {
      const { start } = await createServer({
        specificationPath: '/open-api/specification.yaml',
      });

      try {
        start(port);
      } catch (error) {
        expect(error).toMatchInlineSnapshot(
          `[Error: Invalid PORT or out of bounds.]`,
        );
      }
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
    expect(server.listening).toBe(true);

    shutdown(server);
  });
});
