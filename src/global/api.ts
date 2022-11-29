import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserInfo } from 'Authentification/models';
import { ParamsDictionary } from 'express-serve-static-core';
import { Jwt, JwtPayload, Secret, VerifyOptions } from 'jsonwebtoken';
import { fakeJwt, JwtProxy } from 'global/jwt';

interface ResultBody {
  success: boolean,
  data?: object,
  errors?: Array<Exception>
}

export interface Exception {
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
  status: 400,
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


export type Endpoint = (req: Request | FakeRequest, userInfo?: UserInfo) => Promise<Result>;

export const useEndpoint = (endpoint: Endpoint) => (req: Request, res: Response) => {
  endpoint(req)
    .then((result) => {
      res.status(result.status);

      if (result.body)
        res.json(result.body);
    })
    .catch((e) => {
      console.log(e);

      res.status(400);

      res.json({
        success: false,
        errors: [
          Exception(
            e.key || e.name,
            e.message
          )
        ]
      });
    });
};

export type Secure = (req: Request | FakeRequest) => (ifSecure: (user: UserInfo) => Promise<Result>) => Promise<Result>;

export const secure = (jwt: JwtProxy): Secure => (req: Request | FakeRequest) => (ifSecure: (user: UserInfo) => Promise<Result>): Promise<Result> => {
  const token = req.header('X-Auth-Token');

  if (!token)
    return Promise.resolve(Unauthorized());

  try {
    const data = jwt.verify(token, process.env['JWT_SECRET'] || 'secret');

    return ifSecure(data as UserInfo);
  } catch (e: any) {
    return Promise.resolve(Unauthorized());
  }
};

export const fakeSecure: Secure = secure(fakeJwt);

export type FakeRequestData = { [key: string]: any };

export class FakeRequest {
  params: ParamsDictionary;
  body: FakeRequestData;
  private headers: FakeRequestData;

  constructor(params: ParamsDictionary = {}, body: FakeRequestData = {}, headers: FakeRequestData = {}) {
    this.params = params;
    this.body = body;
    this.headers = headers;
  }

  header = (key: string) => this.headers[key];

  withParams = (params: ParamsDictionary) => new FakeRequest(params, this.body, this.headers);

  withBody = (body: FakeRequestData) => new FakeRequest(this.params, body, this.headers);

  withHeaders = (headers: FakeRequestData) => new FakeRequest(this.params, this.body, headers);
}