import { Plat } from 'Plats/models';
import knex from 'global/knex';
import { getCommande } from 'Commande/models';


export type RetrieveCommandeById = (commandeId: number) => Promise<getCommande | undefined>;

const retrieveCommandeById: RetrieveCommandeById = (commandeId: number) =>

  knex.select(
    knex.ref('id'),
    knex.ref('id_table'),
    knex.ref('Plats'),
    knex.ref('prete'),
  )
    .from<getCommande>('commande')
    .where( {id: commandeId} )
    .first();
 
export default retrieveCommandeById;