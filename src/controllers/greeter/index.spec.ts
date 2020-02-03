import * as request from 'supertest';

import { createServer } from '../../server';

/*
 * Tests
 */

describe('error handling', (): void => {
  it('responds with a status of 400 for a wrong query parameter', async (): Promise<
    void
  > => {
    expect.assertions(2);
    const { expressApp } = await createServer({
      specificationPath: '/open-api/specification.yaml',
    });

    const response = await request(expressApp)
      .get('/sayHello')
      .query({
        name: 'bill',
      });

    expect(response.status).toStrictEqual(400);
    expect(response.body).toMatchInlineSnapshot(`
      Object {
        "error": "Bad Request",
        "error_description": "Value of \\"name\\" parameter should be one of known names.",
      }
    `);
  });
  it('responds with a status of 400 for a missing parameter', async (): Promise<
    void
  > => {
    expect.assertions(2);
    const { expressApp } = await createServer({
      specificationPath: '/open-api/specification.yaml',
    });

    const response = await request(expressApp).get('/sayHello');

    expect(response.status).toStrictEqual(400);
    expect(response.body).toMatchInlineSnapshot(`
      Object {
        "error": "Error",
        "error_description": "Missing required query parameter \\"name\\"",
      }
    `);
  });
});

describe('data persistence', (): void => {
  it('responds with a status of 200', async (): Promise<void> => {
    expect.assertions(2);
    const { expressApp } = await createServer({
      specificationPath: '/open-api/specification.yaml',
    });

    const response = await request(expressApp)
      .get('/sayHello')
      .query({
        name: 'john',
      });

    expect(response.status).toStrictEqual(200);
    expect(response.body).toMatchInlineSnapshot(`
      Object {
        "message": "Hello, john",
      }
    `);
  });
});
