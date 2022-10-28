import { Categorie } from 'Categories/models';
import knex from 'global/knex';

export type InsertCategorie = (categorie: Categorie) => Promise<number>;

const insertCategorie: InsertCategorie = (categorie: Categorie) =>
  knex.insert(categorie)
    .into('categories')
    .returning('id')
    .then((id) => id[0]);

export default insertCategorie;