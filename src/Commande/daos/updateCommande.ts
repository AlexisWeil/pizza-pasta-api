import { Plat, platToInsert } from 'Plats/models';
import knex from 'global/knex';
import { Exception } from 'global/api';
import { Commande } from 'Commande/models';

export type UpdateStatutCommande = (idCommande: number) => Promise<number>;

const updateStatutCommande: UpdateStatutCommande = (idCommande: number) => 
  knex.update({prete : 1})
  .from('commande')
  .where({id : idCommande})
    .then((nbUpdated) => {
      if (nbUpdated <= 0)
        throw Exception('id', 'Commande inconnu');
      
      return idCommande
    });



export default updateStatutCommande;