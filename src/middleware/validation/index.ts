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
): void => {
  const {
    name,
  }: {
    name: string;
  } = request.query;

  if (isKnownName(name) === false) {
    response
      .status(BAD_REQUEST)
      .json(
        makeErrorMessage(
          getStatusText(BAD_REQUEST),
          'Value of "name" parameter should be one of known names.',
        ),
      );

    return;
  }

  next();
};
