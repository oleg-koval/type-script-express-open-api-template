import * as request from 'supertest';

import { createServer } from '../../server';

/*
 * Tests
 */

describe('data persistence', (): void => {
  it('responds with a status of 200', async (): Promise<void> => {
    expect.assertions(1);
    const { expressApp } = await createServer({
      specificationPath: '/open-api/specification.yaml',
    });

    const response = await request(expressApp).get('/health');

    expect(response.status).toStrictEqual(200);
  });
});
