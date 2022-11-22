import { Express } from 'express';
import { secure, useEndpoint } from 'global/api';
import { addPlatAPI, deletePlatAPI, getPlatByIdAPI, updatePlatAPI } from 'Plats/api';
import { addCommandeAPI, getCommandeAPI } from './api';
import commandeService from './commandeService';
import platsService from 'Plats/platsService';

const commandeRoute = (app: Express) => {

  app.post('/commande', useEndpoint(addCommandeAPI(commandeService)));

  app.get('/commande/:id', useEndpoint(getCommandeAPI(commandeService)));

};

export default commandeRoute;