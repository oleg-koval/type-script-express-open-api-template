import { Request, Response } from 'express';
import { OK } from 'http-status-codes';

export const health = async (_: Request, response: Response): Promise<void> => {
  response.status(OK).send();
};
