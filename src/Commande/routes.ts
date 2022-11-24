import { Express } from 'express';
import {secureAdmin,securePrivate,securePublic, useEndpoint } from 'global/api';
import { addCommandeAPI, updateStatutAPI, getCommandeAPI } from './api';
import commandeService from './commandeService';
import platsService from 'Plats/platsService';

const commandeRoute = (app: Express) => {

  app.post('/commande', useEndpoint(securePublic(addCommandeAPI(commandeService))));

  app.get('/commande/:id', useEndpoint(securePublic(getCommandeAPI(commandeService))));

  app.post('/commande/:id/prete', useEndpoint(securePrivate(updateStatutAPI(commandeService))));

};

export default commandeRoute;