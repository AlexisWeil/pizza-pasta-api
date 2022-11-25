import { Commande } from 'Commandes/models';
import knex from 'global/knex';
import * as _ from 'lodash';
import { Plat } from 'Plats/models';

export type RetrieveCommandeById = (commandeId: number) => Promise<Commande | undefined>;

const retrieveCommandeById: RetrieveCommandeById = (commandeId: number) =>
  knex.select(
    knex.ref('C.id').as('commandeId'),
    knex.ref('C.table_fk').as('tableId'),
    knex.ref('C.prete').as('commandePrete'),
    knex.ref('P.id').as('platId'),
    knex.ref('P.categorie_fk').as('categorieId'),
    knex.ref('P.nom').as('platNom'),
    knex.ref('P.prix').as('platPrix'),
    knex.ref('P.ingredients').as('platIngredients')
  ).from('commandes as C')
    .join('commandes_plats as CP', 'C.id', 'CP.commande_fk')
    .join('plats as P', 'P.id', 'CP.plat_fk')
    .where( { 'C.id': commandeId })
    .then((rows) => {
      if (rows.length > 0) {
        const plats: Array<Plat> = rows.map((row) =>
          Plat(
            row.platId,
            row.categorieId,
            row.platNom,
            row.platPrix,
            row.platIngredients
          )
        );

        return Commande(
          commandeId,
          rows[0].tableId,
          rows[0].commandePrete === 1,
          plats
        );
      }

      return undefined;
    });

export default retrieveCommandeById;
