import { z } from 'zod';
import { AuthentificationService } from 'Authentification/authentificationService';
import { Endpoint, Ok } from 'global/api';
import { validate } from 'global/validations';
import * as jwt from 'jsonwebtoken';

const UserForm = z.object({
  nom: z.string(),
  motDePasse: z.string(),
  role: z.enum(['TABLE', 'CUISINE', 'SERVEUR']),
  serveurId: z.number().optional()
});

type UserForm = z.infer<typeof UserForm>;

export const creerCompteAPI = (authentificationService: AuthentificationService): Endpoint => (req) =>
  validate(UserForm)(req.body)((user: UserForm) =>
    authentificationService.creerCompte({ ...user, id: 0 })
      .then(Ok)
  );


const LoginForm = z.object({
  nom: z.string(),
  motDePasse: z.string()
});

type LoginForm = z.infer<typeof LoginForm>;

export const loginAPI = (authentificationService: AuthentificationService): Endpoint => (req) =>
  validate(LoginForm)(req.body)((login: LoginForm) =>
    authentificationService.verificationConnexion(login.nom, login.motDePasse)
      .then((userInfo) => {
        const token = jwt.sign(userInfo, process.env['JWT_SECRET'] || 'secret', { expiresIn: '30d' });

        return Ok({
          token
        });
      })
  );