import { Express } from 'express';
import { secure, useEndpoint } from 'global/api';
import { addCommandeAPI, getCommandeByIdAPI, setCommandePreteAPI } from 'Commandes/api';
import commandesService from 'Commandes/commandesService';

const commandesRoutes = (app: Express) => {
  app.post('/commande', useEndpoint(secure(addCommandeAPI(commandesService))));

  app.get('/commande/:id', useEndpoint(secure(getCommandeByIdAPI(commandesService))));

  app.post('/commande/:id/prete', useEndpoint(secure(setCommandePreteAPI(commandesService))));
};

export default commandesRoutes;