import { Plat } from 'Plats/models';
import knex from 'global/knex';
import { getCommande } from 'Commande/models';

export type RetrieveCommandeById = (id: number) => Promise<getCommande | undefined>;

const retrieveCommandeById: RetrieveCommandeById = (id: number) =>{
 return knex.select(
    knex.ref('id'),
    knex.ref('id_table'),
    knex.ref('Plats'),
    knex.ref('statut'),
  )
    .where({ 'id': id })
    .first();
 }
export default retrieveCommandeById;