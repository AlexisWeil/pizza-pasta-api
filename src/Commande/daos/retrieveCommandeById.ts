import { Plat } from 'Plats/models';
import knex from 'global/knex';
import { getCommande } from 'Commande/models';


export type RetrieveCommandeById = (commandeId: number) => Promise<any>;

const retrieveCommandeById: RetrieveCommandeById = (commandeId: number) =>{


  {console.log(commandeId)
    return knex.raw(`SELECT commande.id, commande.id_table, commande.prete
            FROM commande 
               ;`)
  }
}
// where commande.id= ${commandeId} 


 
export default retrieveCommandeById;

  // knex.select(
  //   knex.ref('id'),
  //   knex.ref('id_table'),
  //   knex.ref('prete'),
  //   knex.ref('id_plats')
  // )
  //   .from('commande')
  //   .join('commande_plats', {'commande_plats.id' : 'commande.id'})
  //   .where( {'commande.id': commandeId} )
  //   .first()
  //   .then((res) => {
  //     console.log(res.id_plats)
  //   });

    // knex.table('commande_plats')
    // .pluck('id_plats')
    // .innerJoin('commande', {'commande_plats.id' : 'commande.id'})
    // .where( {'commande.id': commandeId} )
    // .then((res) => {
    //   console.log(res.id_plats)
    // });

    // knex.raw(`SELECT commande.id, commande.id_table, commande.prete, 
    //           commande_plats.id_plats, commande_plats.id_commande
    //  FROM commande 
    //  JOINT commande_plats ON commande_plats.id_commande=commande.id 
    //  AND commande.id= ${commandeId} ;`)
    //  .then((res) => {
    //   console.log(res)
    //  })