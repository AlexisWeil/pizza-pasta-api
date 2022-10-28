import * as express from 'express';
import { Categorie } from 'Categories/models';
import { Plat, PlatList } from 'Plats/models';
import knex from 'global/knex';
import * as _ from 'lodash';
import { NotFound, Ok, useEndpoint } from 'global/api';
import { Request } from 'express';
import carteRoutes from 'Carte/routes';
import platsRoutes from 'Plats/routes';
import categoriesRoutes from 'Categories/routes';
import authentificationRoutes from 'Authentification/routes';

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () =>
  console.log('Server listening on port ' + port)
);

carteRoutes(app);
platsRoutes(app);
categoriesRoutes(app);
authentificationRoutes(app);

knex.raw('SELECT VERSION()')
  .then((version) =>
    console.log('MySQL version : ', version[0][0]['VERSION()'])
  );

export default app;