import { Categorie } from 'Categories/models';
import knex from 'global/knex';
import { Exception } from 'global/api';
import { Either, Left, Maybe, Right } from 'monet';

export type CategorieOrException = Either<Exception, Maybe<Categorie>>;

export type RetrieveCategorieById = (categorieId: number) => Promise<CategorieOrException>;

const retrieveCategorieById: RetrieveCategorieById = (categorieId: number) =>
  knex.select()
    .from<Categorie>('categories')
    .where({ id: categorieId })
    .first()
    .then(Maybe.fromNull)
    .then(Right<Exception, Maybe<Categorie>>)
    .catch((e) => Left(Exception('retrieve-categorie', e.message)));

export default retrieveCategorieById;