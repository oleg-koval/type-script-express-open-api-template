import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST, getStatusText } from 'http-status-codes';

import { makeErrorMessage } from '../errorHandler';

const isKnownName = (name: string): boolean => {
  return ['andy', 'john', 'steve'].some(
    (knownName: string): boolean => name === knownName,
  );
};

export const validateGreeterRequest = (
  request: Request,
  response: Response,
  next: NextFunction,
): undefined => {
  const {
    name,
  }: {
    readonly name: string;
  } = request.query;

  isKnownName(name) === false // eslint-disable-line functional/no-expression-statement
    ? response
        .status(BAD_REQUEST)
        .json(
          makeErrorMessage(
            getStatusText(BAD_REQUEST),
            'Value of "name" parameter should be one of known names.',
          ),
        )
    : undefined;

  next(); // eslint-disable-line functional/no-expression-statement

  return undefined;
};
