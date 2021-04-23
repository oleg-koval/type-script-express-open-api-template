import { Request, Response } from 'express';
import { OK } from 'http-status-codes';

type IQueryParameters = {
  readonly name: string;
};

export const greeter = (request: Request, response: Response): unknown => {
  const { query } = request;
  const queryParameters: IQueryParameters = query;

  const responded = response.status(OK).json({
    message: `Hello, ${queryParameters.name}`,
  });

  return responded;
};
