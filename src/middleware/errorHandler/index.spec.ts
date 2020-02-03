import * as express from 'express';
import { OK } from 'http-status-codes';
import * as httpMocks from 'node-mocks-http';

import * as handler from '../errorHandler';

/*
 * Test utilities
 */

const responseMock: express.Response = httpMocks.createResponse();
const requestMock: express.Request = httpMocks.createRequest();
const nextMock = jest.fn();
jest.spyOn({ nextMock }, 'nextMock');
jest.spyOn(responseMock, 'json');

/**
 * Tests
 */

describe('error handler', (): void => {
  it('responds with validation error', (): void => {
    expect.assertions(3);

    handler.errorHandler(
      {
        message: 'message',
        name: 'name',
        status: OK,
      },
      requestMock,
      responseMock,
      nextMock,
    );

    expect(responseMock.json).toHaveBeenCalledWith({
      error: 'name',
      error_description: 'message',
    });
    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenCalledWith();
  });

  it('responds with server error', (): void => {
    expect.assertions(3);

    const error = {
      message: 'message',
      name: 'name',
    };
    handler.errorHandler(error, requestMock, responseMock, nextMock);

    expect(responseMock.json).toHaveBeenCalledWith({
      error: 'Server Error',
      error_description:
        "The server has encountered a situation it doesn't know how to handle.",
    });
    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenCalledWith(error);
  });
});
