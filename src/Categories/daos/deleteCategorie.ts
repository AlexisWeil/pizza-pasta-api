import knex from 'global/knex';
import { Exception } from 'global/api';

export type DeleteCategorie = (id: number) => Promise<void>;

const deleteCategorie: DeleteCategorie = (id: number) =>
  knex.delete()
    .from('categories')
    .where({ id })
    .then((nbDeleted) => {
      if (nbDeleted <= 0)
        throw Exception('id', 'Categorie inconnue');
    });

export default deleteCategorie;