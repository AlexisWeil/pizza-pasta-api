import { Express } from 'express';
import { secure, useEndpoint } from 'global/api';
import { addPlatAPI, deletePlatAPI, getPlatByIdAPI, updatePlatAPI } from 'Plats/api';
import platsService from 'Plats/platsService';
import * as multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/plats');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + '-' + file.originalname);
    }
  })
});

const platsRoutes = (app: Express) => {
  app.get('/plat/:id', useEndpoint(getPlatByIdAPI(platsService)));

  app.post('/plat', useEndpoint(secure(addPlatAPI(platsService))));

  app.put('/plat/:id', useEndpoint(secure(updatePlatAPI(platsService))));

  app.delete('/plat/:id', useEndpoint(secure(deletePlatAPI(platsService))));
};

export default platsRoutes;