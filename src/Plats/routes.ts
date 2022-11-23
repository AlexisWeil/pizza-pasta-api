import { Express } from 'express';
import { secureCuisine, useEndpoint } from 'global/api';
import { addPlatAPI, deletePlatAPI, getPlatByIdAPI, updatePlatAPI } from 'Plats/api';
import platsService from 'Plats/platsService';

const platsRoutes = (app: Express) => {
  app.get('/plat/:id', useEndpoint(secureCuisine(getPlatByIdAPI(platsService))));

  app.post('/plat', useEndpoint(secureCuisine(addPlatAPI(platsService))));

  app.put('/plat/:id', useEndpoint(secureCuisine(updatePlatAPI(platsService))));

  app.delete('/plat/:id', useEndpoint(secureCuisine(deletePlatAPI(platsService))));
};

export default platsRoutes;