import { Express } from 'express';
import { useEndpoint } from 'global/api';
import { addPlat, getPlatByIdAPI } from 'Plats/api';
import platsService from 'Plats/platsService';

const platsRoutes = (app: Express) => {
  app.get('/plat/:id', useEndpoint(getPlatByIdAPI(platsService)));

  app.post('/plat', useEndpoint(addPlat(platsService)));
};

export default platsRoutes;