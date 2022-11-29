import { JwtPayload, Secret, VerifyOptions } from 'jsonwebtoken';
import { Exception } from 'global/api';

export type JwtProxy = {
  verify: (token: string, secretOrPublicKey: Secret, options?: VerifyOptions & { complete: true }) => JwtPayload | string
};

export const fakeJwt: JwtProxy = {
  verify: (token: string, secretOrPublicKey: Secret, options?: VerifyOptions & { complete: true }) => {
    if (token === 'table1')
      return {
        id: 0,
        nom: 'Table 1',
        role: 'TABLE',
        serveurId: 2,
        tablesIds: []
      };

    throw Exception('token', 'Fail verify JWT token');
  }
};