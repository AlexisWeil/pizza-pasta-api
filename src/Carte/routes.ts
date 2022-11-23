import { Express } from 'express';
import { securePublic, useEndpoint } from 'global/api';
import { getCarteAPI } from 'Carte/api';
import carteService from 'Carte/carteService';


const carteRoutes = (app: Express) => {
  app.get('/carte', useEndpoint(securePublic(getCarteAPI(carteService))));
};

export default carteRoutes;