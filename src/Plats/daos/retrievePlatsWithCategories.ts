import { PlatListWithCategorie } from 'Plats/models';
import knex from 'global/knex';

export type RetrievePlatsWithCategories = () => Promise<Array<PlatListWithCategorie>>;

const retrievePlatsWithCategories: RetrievePlatsWithCategories = () =>
  knex.select(
    'p.id AS id',
    'c.nom AS categorie',
    'p.nom AS nom',
    'p.prix AS prix'
  )
    .from('plats AS p')
    .join('categories AS c', 'p.categorie_fk', '=', 'c.id');

export default retrievePlatsWithCategories;