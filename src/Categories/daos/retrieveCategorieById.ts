import { Categorie } from 'Categories/models';
import knex from 'global/knex';

export type RetrieveCategorieById = (categorieId: number) => Promise<Categorie | undefined>;

const retrieveCategorieById: RetrieveCategorieById = (categorieId: number) =>
  knex.select()
    .from<Categorie>('categories')
    .where({ id: categorieId })
    .first();

export default retrieveCategorieById;