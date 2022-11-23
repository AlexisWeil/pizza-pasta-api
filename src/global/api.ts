import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserInfo } from 'Authentification/models';

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


export type Endpoint = (req: Request, userInfo?: UserInfo) => Promise<Result>;

export const useEndpoint = (endpoint: Endpoint) => (req: Request, res: Response) => {
  endpoint(req)
    .then((result) => {
      res.status(result.status);

      if (result.body)
        res.json(result.body);
    })
    .catch((e) => {
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

export const securePublic = (endpoint: Endpoint): Endpoint => (req: Request): Promise<Result> => {
  const token = req.header('X-Auth-Token');

  if (!token)
    return Promise.resolve(Unauthorized());

  try {
    const data = jwt.verify(token, process.env['JWT_SECRET'] || 'secret');
    console.log("Secure Public : ",data)
    const dataJSON:any = JSON.stringify(data);
    if(dataJSON.id_role === (1|2|3)){
      return Promise.resolve(Unauthorized());
    }else{
      return endpoint(req, data as UserInfo);
    }
  } catch (e: any) {
    return Promise.resolve(Unauthorized());
  }
};

export const securePrivate = (endpoint: Endpoint): Endpoint => (req: Request): Promise<Result> => {
  const token = req.header('X-Auth-Token');

  if (!token)
    return Promise.resolve(Unauthorized());

  try {
    const data = jwt.verify(token, process.env['JWT_SECRET'] || 'secret');
    console.log("Secure Private : ",data)
    const dataJSON:any = JSON.stringify(data);
    if(dataJSON.id_role === (2 | 3)){
      return Promise.resolve(Unauthorized());
    }else{
      return endpoint(req, data as UserInfo);
    }
  } catch (e: any) {
    return Promise.resolve(Unauthorized());
  }
};

export const secureAdmin = (endpoint: Endpoint): Endpoint => (req: Request): Promise<Result> => {
  const token = req.header('X-Auth-Token');

  if (!token)
    return Promise.resolve(Unauthorized());

  try {
    const data = jwt.verify(token, process.env['JWT_SECRET'] || 'secret');
    console.log("Secure Admin :", data)
    const dataJSON:any = JSON.stringify(data);
    if(dataJSON.id_role === 2){
      return Promise.resolve(Unauthorized());
    }else{
      return endpoint(req, data as UserInfo);
    }
    
  } catch (e: any) {
    return Promise.resolve(Unauthorized());
  }
};