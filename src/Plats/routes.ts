import { Express } from 'express';
import { useEndpoint } from 'global/api';
import { getPlatByIdAPI } from 'Plats/api';
import platsService from 'Plats/platsService';

const platsRoutes = (app: Express) => {
  app.get('/plat/:id', useEndpoint(getPlatByIdAPI(platsService)));
};

export default platsRoutes;