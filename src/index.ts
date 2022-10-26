import * as express from 'express';
import { Categorie } from 'Categorie/models';
import { Plat, PlatList } from 'Plat/models';
import knex from 'global/knex';
import * as _ from 'lodash';

const app = express();
const port = 3000;

app.listen(port, () =>
  console.log('Server listening on port ' + port)
);

knex.raw('SELECT VERSION()')
  .then((version) =>
    console.log('MySQL version : ', version[0][0]['VERSION()'])
  );

app.get('/carte', (req, res) => {
  retrievePlatsWithCategories()
    .then(groupRowsByCategorie)
    .then(removeCategorieFromPlatLists)
    .then((carte) => res.json(carte));
});

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



app.get('/plat/:id', (req, res) => {
  retrievePlatById(Number(req.params.id))
    .then((plat: Plat | undefined) => {
      if (!plat) {
        res
          .status(404)
          .json({
            error: 'Plat inconnu'
          });
      } else {
        res.json(plat);
      }
    });
});

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


app.get('/categories', (req, res) => {
  listCategories()
    .then((categories) => res.json(categories));
});

        const listCategories = (): Promise<Array<Categorie>> =>
          knex.select()
            .from<Categorie>('categories')
            .orderBy('id');