import * as express from 'express';
import { Categorie } from 'Categorie/models';
import { Plat, PlatList } from 'Plat/models';
import knex from 'global/knex';
import * as _ from 'lodash';
import { NotFound, Ok, useEndpoint } from 'global/api';
import { Request } from 'express';

const app = express();
const port = 3000;

app.listen(port, () =>
  console.log('Server listening on port ' + port)
);

knex.raw('SELECT VERSION()')
  .then((version) =>
    console.log('MySQL version : ', version[0][0]['VERSION()'])
  );

app.get('/carte', useEndpoint((req: Request) =>
  retrievePlatsWithCategories()
    .then(groupRowsByCategorie)
    .then(removeCategorieFromPlatLists)
    .then(Ok)
));

        const retrievePlatsWithCategories = () =>
          knex.select(
            'p.id AS id',
            'c.nom AS categorie',
            'p.nom AS nom',
            'p.prix AS prix'
          )
            .from('plats AS p')
            .join('categories AS c', 'p.categorie_fk', '=', 'c.id');

        const groupRowsByCategorie = (rows: Array<any>): { [key: string]: object } =>
          _.groupBy(rows, (row) => row.categorie);

        const removeCategorieFromPlatLists = (categories: { [key: string]: object }) =>
          _.mapValues(categories, rowsToPlatLists);

                const rowsToPlatLists = (rows: Array<any>): Array<PlatList> =>
                  rows.map((r) =>
                    PlatList(r.id, r.nom, r.prix)
                  );


app.get('/plat/:id', useEndpoint((req: Request) =>
  retrievePlatById(Number(req.params.id))
    .then((plat: Plat | undefined) =>
      plat ?
        Ok(plat) :
        NotFound('Plat inconnu')
    )
));

        const retrievePlatById = (id: number): Promise<Plat | undefined> =>
          knex.select(
            knex.ref('id'),
            knex.ref('categorie_fk').as('categorieId'),
            knex.ref('nom'),
            knex.ref('prix'),
            knex.ref('ingredients')
          ).from<Plat>('plats')
            .where({ 'id': id })
            .first();


app.get('/categories', useEndpoint((req) =>
  listCategories()
    .then(Ok)
));

        const listCategories = (): Promise<Array<Categorie>> =>
          knex.select()
            .from<Categorie>('categories')
            .orderBy('id');