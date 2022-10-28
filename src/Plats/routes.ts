import { Express } from 'express';
import { secure, useEndpoint } from 'global/api';
import { addPlatAPI, deletePlatAPI, getPlatByIdAPI, updatePlatAPI } from 'Plats/api';
import platsService from 'Plats/platsService';

const platsRoutes = (app: Express) => {
  app.get('/plat/:id', useEndpoint(getPlatByIdAPI(platsService)));

  app.post('/plat', useEndpoint(secure(addPlatAPI(platsService))));

  app.put('/plat/:id', useEndpoint(updatePlatAPI(platsService)));

  app.delete('/plat/:id', useEndpoint(deletePlatAPI(platsService)));
};

export default platsRoutes;