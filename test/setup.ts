import * as nock from 'nock';

import { LOCALHOST_HOST_MATCHERS } from './configuration';

jest.setTimeout(3000);

// jest.spyOn(console, 'log').mockImplementation();
jest.spyOn(console, 'error').mockImplementation();
jest.spyOn(console, 'warn').mockImplementation();

beforeAll((): unknown => {
  nock.enableNetConnect(new RegExp(LOCALHOST_HOST_MATCHERS, 'u'));

  return;
});

const nockCleanMocks = (): unknown => {
  const pending = nock.pendingMocks();
  nock.cleanAll();
  console.error(`Pending mocks detected: ${pending}.`);
  return;
};

afterEach((): unknown => {
  // Reset all mocks after each test run.
  jest.clearAllMocks();

  // Assert all HTTP mocks were called.
  nock.isDone() !== true ? nockCleanMocks() : undefined;

  // Reset network recording after each test run.
  nock.restore();
  nock.activate();

  // Clear databases here.

  return;
});
