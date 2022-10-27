import { Categorie } from 'Categories/models';
import knex from 'global/knex';

export type RetrieveCategories = () => Promise<Array<Categorie>>;

const retrieveCategories: RetrieveCategories = () =>
  knex.select()
    .from<Categorie>('categories')
    .orderBy('id');

export default retrieveCategories;