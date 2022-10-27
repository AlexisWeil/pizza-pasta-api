import { Plat } from 'Plats/models';
import knex from 'global/knex';

export type RetrievePlatById = (id: number) => Promise<Plat | undefined>;

const retrievePlatById: RetrievePlatById = (id: number) =>
  knex.select(
    knex.ref('id'),
    knex.ref('categorie_fk').as('categorieId'),
    knex.ref('nom'),
    knex.ref('prix'),
    knex.ref('ingredients')
  ).from<Plat>('plats')
    .where({ 'id': id })
    .first();

export default retrievePlatById;