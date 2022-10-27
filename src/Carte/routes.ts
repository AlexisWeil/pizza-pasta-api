import { Express } from 'express';
import { useEndpoint } from 'global/api';
import { getCarteAPI } from 'Carte/api';
import carteService from 'Carte/carteService';

const carteRoutes = (app: Express) => {
  app.get('/carte', useEndpoint(getCarteAPI(carteService)));
};

export default carteRoutes;