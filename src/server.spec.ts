import { PORT } from './config';
import { createServer } from './server';

const OUT_OF_LOWER_BOUNDS_PORT = 1023;
const OUT_OF_UPPER_BOUNDS_PORT = 65536;

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

  it.each([OUT_OF_LOWER_BOUNDS_PORT, OUT_OF_UPPER_BOUNDS_PORT])(
    'should throw an error when passed a port which is out of bounds: %d',
    async (port: number): Promise<void> => {
      const { start } = await createServer({
        specificationPath: '/open-api/specification.yaml',
      });

      try {
        start(port);
      } catch (error) {
        expect(error).toMatchInlineSnapshot(
          `[RangeError: Port should be >= 0 and < 65536. Received 65536.]`,
        );
      }
    },
  );
});

describe('runtime', (): void => {
  it('starts the server when correct parameters are passed', async (): Promise<
    void
  > => {
    expect.assertions(1);

    const { start, shutdown } = await createServer({
      specificationPath: '/open-api/specification.yaml',
    });
    const server = start(PORT);
    expect(server.listening).toBe(true);

    shutdown(server);
  });
});
