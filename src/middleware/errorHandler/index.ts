/* eslint-disable max-params */

import { NextFunction, Request, Response } from 'express';
import { getStatusText, INTERNAL_SERVER_ERROR } from 'http-status-codes';

/**
 * Error status defaults to 500
 */
interface ErrorResponsePayload extends Error {
  message: string;
  name: string;
  status?: number;
}

export const makeErrorMessage = (
  error: string,
  errorDescription: string,
): { error: string; error_description: string } => ({
  error,
  error_description: errorDescription,
});

export const errorHandler = (
  error: ErrorResponsePayload,
  _request: Request,
  response: Response,
  next: NextFunction,
): void => {
  if (
    typeof error.status === 'number' &&
    error.status !== INTERNAL_SERVER_ERROR
  ) {
    response
      .status(error.status)
      .json(makeErrorMessage(error.name, error.message.replace(/\n/gu, '')));

    return next();
  }

  response
    .status(INTERNAL_SERVER_ERROR)
    .json(
      makeErrorMessage(
        getStatusText(INTERNAL_SERVER_ERROR),
        "The server has encountered a situation it doesn't know how to handle.",
      ),
    );

  return next(error);
};

/* eslint-enable max-params */
