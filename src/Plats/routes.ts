import { Express } from 'express';
import { secureAdmin, useEndpoint } from 'global/api';
import { addPlatAPI, deletePlatAPI, getPlatByIdAPI, updatePlatAPI } from 'Plats/api';
import platsService from 'Plats/platsService';

const platsRoutes = (app: Express) => {
  app.get('/plat/:id', useEndpoint(secureAdmin(getPlatByIdAPI(platsService))));

  app.post('/plat', useEndpoint(secureAdmin(addPlatAPI(platsService))));

  app.put('/plat/:id', useEndpoint(secureAdmin(updatePlatAPI(platsService))));

  app.delete('/plat/:id', useEndpoint(secureAdmin(deletePlatAPI(platsService))));
};

export default platsRoutes;