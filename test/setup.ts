import * as nock from 'nock';

import { LOCALHOST_HOST_MATCHERS } from './configuration';

jest.setTimeout(3000);

jest.spyOn(console, 'log').mockImplementation();
jest.spyOn(console, 'error').mockImplementation();
jest.spyOn(console, 'warn').mockImplementation();

beforeAll(
  async (): Promise<void> => {
    nock.enableNetConnect(new RegExp(LOCALHOST_HOST_MATCHERS, 'u'));
  },
);

afterEach(
  async (): Promise<void> => {
    // Reset all mocks after each test run.
    jest.clearAllMocks();

    // Assert all HTTP mocks were called.
    if (nock.isDone() !== true) {
      const pending = nock.pendingMocks();

      nock.cleanAll();

      throw new Error(`Pending mocks detected: ${pending}.`);
    }

    // Reset network recording after each test run.
    nock.restore();
    nock.activate();

    // Clear databases here.
  },
);
