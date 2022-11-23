import * as express from 'express';
import knex from 'global/knex';
import * as _ from 'lodash';
import carteRoutes from 'Carte/routes';
import platsRoutes from 'Plats/routes';
import categoriesRoutes from 'Categories/routes';
import authentificationRoutes from 'Authentification/routes';
import commandeRoute from 'Commande/routes';

import { wsServer } from 'ws/server';

const app = express();
const port = 3002;

app.use(express.json());

// app.listen(port, () =>
//   console.log('Server listening on port ' + port)
// );


carteRoutes(app);
platsRoutes(app);
categoriesRoutes(app);
authentificationRoutes(app);
commandeRoute(app);
wsServer(app, port);


knex.raw('SELECT VERSION()')
  .then((version) =>
    console.log('MySQL version : ', version[0][0]['VERSION()'])
  );


export default app;