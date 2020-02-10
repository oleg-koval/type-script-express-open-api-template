import { Request, Response } from 'express';
import { OK } from 'http-status-codes';

export const health = (_: Request, response: Response): unknown =>
  response.status(OK).send();
