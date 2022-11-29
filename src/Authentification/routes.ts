import { useEndpoint } from 'global/api';
import { creerCompteAPI, fizzBuzzAPI, loginAPI } from 'Authentification/api';
import authentificationService from 'Authentification/authentificationService';
import { Express } from 'express';

const authentificationRoutes = (app: Express) => {
  app.post('/creer-compte', useEndpoint(creerCompteAPI(authentificationService)));

  app.post('/login', useEndpoint(loginAPI(authentificationService)));

  app.get('/fizzbuzz', useEndpoint(fizzBuzzAPI));
};

export default authentificationRoutes;