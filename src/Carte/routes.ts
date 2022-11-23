import { Express } from 'express';
import { useEndpoint } from 'global/api';
import { getCarteAPI } from 'Carte/api';
import carteService from 'Carte/carteService';
import { secureTable } from 'global/api';

const carteRoutes = (app: Express) => {
  app.get('/carte', useEndpoint(secureTable(getCarteAPI(carteService))));
};

export default carteRoutes;