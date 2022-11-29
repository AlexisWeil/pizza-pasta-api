import { Express } from 'express';
import { secure, useEndpoint } from 'global/api';
import { addCommandeAPI, getCommandeByIdAPI, setCommandePreteAPI } from 'Commandes/api';
import commandesService from 'Commandes/commandesService';
import * as jwt from 'jsonwebtoken';

const commandesRoutes = (app: Express) => {
  app.post('/commande', useEndpoint(addCommandeAPI(commandesService, secure(jwt))));

  app.get('/commande/:id', useEndpoint(getCommandeByIdAPI(commandesService, secure(jwt))));

  app.post('/commande/:id/prete', useEndpoint(setCommandePreteAPI(commandesService, secure(jwt))));
};

export default commandesRoutes;