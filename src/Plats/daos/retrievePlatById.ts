import { Plat } from 'Plats/models';
import knex, { handleSQLException } from 'global/knex';
import { Exception } from 'global/api';
import { Either, Maybe, Right } from 'monet';

export type RetrievePlatById = (id: number) => Promise<Either<Exception, Maybe<Plat>>>;

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
    .then((row) => Right<Exception, Maybe<Plat>>(Maybe.fromNull(row)))
    .catch(handleSQLException('plat-retrieve'));

export default retrievePlatById;