/* eslint-disable max-params */

import { NextFunction, Request, Response } from 'express';
import { getStatusText, INTERNAL_SERVER_ERROR } from 'http-status-codes';

/**
 * Error status defaults to 500
 */
type ErrorResponsePayload = Error & {
  readonly message: string;
  readonly name: string;
  readonly status?: number;
};

export const makeErrorMessage = (
  error: string,
  errorDescription: string,
): { readonly error: string; readonly error_description: string } => ({
  error,
  error_description: errorDescription,
});

const respondWithError = (
  status: number,
  response: Response,
  errorData: { readonly error: string; readonly error_description: string },
): Response => response.status(status).json(errorData);

export const errorHandler = (
  error: ErrorResponsePayload,
  _request: Request,
  response: Response,
  next: NextFunction,
): undefined => {
  typeof error.status === 'number' && error.status !== INTERNAL_SERVER_ERROR // eslint-disable-line functional/no-expression-statement
    ? respondWithError(
        error.status,
        response,
        makeErrorMessage(error.name, error.message.replace(/\n/gu, '')),
      )
    : respondWithError(
        INTERNAL_SERVER_ERROR,
        response,
        makeErrorMessage(
          getStatusText(INTERNAL_SERVER_ERROR),
          "The server has encountered a situation it doesn't know how to handle.",
        ),
      );

  next(error); // eslint-disable-line functional/no-expression-statement

  return undefined;
};

/* eslint-enable max-params */
