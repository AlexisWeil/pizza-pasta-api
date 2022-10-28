import { Categorie } from 'Categories/models';
import knex from 'global/knex';
import { Exception } from 'global/api';

export type UpdateCategorie = (categorie: Categorie) => Promise<Categorie>;

const updateCategorie: UpdateCategorie = (categorie: Categorie) =>
  knex.update({
    nom: categorie.nom
  }).from('categories')
    .where({id: categorie.id})
    .then((nbUpdated) => {
      if (nbUpdated <= 0)
        throw Exception('id', 'Catégorie inconnue');

      return categorie;
    });

export default updateCategorie;