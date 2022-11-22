import { Express } from 'express';
import { secure, useEndpoint } from 'global/api';
import { addPlatAPI, deletePlatAPI, getPlatByIdAPI, updatePlatAPI } from 'Plats/api';
import { addCommandeAPI } from './api';
import commandeService from './commandeService';
import platsService from 'Plats/platsService';

const commandeRoute = (app: Express) => {

  app.post('/commande', useEndpoint(addCommandeAPI(commandeService)));

  app.get('/commande2:id', useEndpoint(addCommandeAPI(commandeService)));

};

export default commandeRoute;