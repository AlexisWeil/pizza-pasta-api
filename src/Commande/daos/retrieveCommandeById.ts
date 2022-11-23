import { Plat, PlatService } from 'Plats/models';
import knex from 'global/knex';
import { GetCommandeWithPlatService, getCommandeWithPlatService } from 'Commande/models';


export type RetrieveCommandeById = (commandeId: number) => Promise<any>;

const retrieveCommandeById: RetrieveCommandeById = (commandeId: number) =>{


  {console.log(commandeId)
    return knex.raw(`SELECT commande.id, commande.id_table, commande.prete, 
                            commande_plats.id_plats, commande_plats.id_commande,
                            plats.nom, plats.prix, plats.ingredients
                      FROM commande
                        JOIN commande_plats 
                          ON commande.id=commande_plats.id_commande
                          JOIN plats
                            ON plats.id = commande_plats.id_plats
                              AND commande.id= ${commandeId}
                  
    ;`).then((res) => {
      console.log(res[0])
      const ArrayPlatService:Array<PlatService> = res[0].map((row:any) => {
        return PlatService(row.nom, row.prix, row.ingredients)
      })
      const row = res[0][0]
      console.log(row)
      return getCommandeWithPlatService(row.id_commande, row.id_table, ArrayPlatService, row.prete)
    })  
  }
}



 
export default retrieveCommandeById;
