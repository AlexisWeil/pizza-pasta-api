import { Plat } from 'Plats/models';
import knex from 'global/knex';
import { Maybe, None, Some } from 'monet';

export type RetrievePlatById = (id: number) => Promise<Maybe<Plat>>;

const retrievePlatById: RetrievePlatById = (id: number) =>
  knex.select(
    knex.ref('id'),
    knex.ref('categorie_fk').as('categorieId'),
    knex.ref('nom'),
    knex.ref('prix'),
    knex.ref('ingredients')
  ).from<Plat>('plats')
    .where({ 'id': id })
    .first()
    .then((plat:Plat | undefined) => plat? Some(plat) : None());

export default retrievePlatById;