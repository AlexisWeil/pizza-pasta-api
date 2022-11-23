import { Express } from 'express';
import {secureCuisine, useEndpoint } from 'global/api';
import { addCommandeAPI, updateStatutAPI, getCommandeAPI } from './api';
import commandeService from './commandeService';
import platsService from 'Plats/platsService';

const commandeRoute = (app: Express) => {

  app.post('/commande', useEndpoint(addCommandeAPI(commandeService)));

  app.get('/commande/:id', useEndpoint(getCommandeAPI(commandeService)));

  app.post('/commande/:id/prete', useEndpoint(secureCuisine(updateStatutAPI(commandeService))));

};

export default commandeRoute;