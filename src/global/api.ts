import { Request, Response } from 'express';

interface Result {
  status: number,
  body?: object
}

export const Ok = (body?: object): Result => ({
  status: 200,
  body
});

export const BadRequest = (body?: object): Result => ({
  status: 200,
  body
});

export const Unauthorized = (): Result => ({
  status: 401,
  body: {
    error: 'You are no allowed to access this resource'
  }
});

export const NotFound = (message?: string): Result => ({
  status: 404,
  body: {
    error: message || 'Unknown resource'
  }
});

export type Endpoint = (req: Request) => Promise<Result>;

export const useEndpoint = (endpoint: Endpoint) => (req: Request, res: Response) => {
  endpoint(req)
    .then((result) => {
      res.status(result.status);

      if (result.body)
        res.json(result.body);
    });
};