import { Request, Response } from 'express';

interface ResultBody {
  success: boolean,
  data?: object,
  errors?: Array<Exception>
}

interface Exception {
  key: string,
  message: string
}

export const Exception = (key: string, message: string): Exception => ({
  key,
  message
});

export interface Result {
  status: number,
  body: ResultBody
}

export const Ok = (data?: object): Result => ({
  status: 200,
  body: {
    success: true,
    data
  }
});

export const BadRequest = (errors?: Array<Exception>): Result => ({
  status: 200,
  body: {
    success: false,
    errors
  }
});

export const Unauthorized = (): Result => ({
  status: 401,
  body: {
    success: false,
    errors: [{
      key: 'Authentication',
      message: 'You are no allowed to access this resource'
    }]
  }
});

export const NotFound = (message?: string): Result => ({
  status: 404,
  body: {
    success: false,
    errors: [{
      key: 'NotFound',
      message: message || 'Unknown resource'
    }]
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