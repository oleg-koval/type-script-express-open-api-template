import { Request, Response } from 'express';
import { OK } from 'http-status-codes';

interface IQueryParameters {
  name: string;
}

export const greeter = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { query } = request;
  const queryParameters: IQueryParameters = query;

  response.status(OK).json({
    message: `Hello, ${queryParameters.name}`,
  });
};
