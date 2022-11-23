import { Plat, platToInsert } from 'Plats/models';
import knex from 'global/knex';
import { CommandeToBDD, commandeToInsert, PlatsCommandeToBDD , PlatscommandeToInsert} from 'Commande/models';
import { number } from 'zod';
import { BadRequest } from 'global/api';


export type InsertCommande = (commandeToBDD: CommandeToBDD, ids: Number[]) => Promise<Object>;

const insterCommande: InsertCommande = (commandeToBDD: CommandeToBDD, ids: Number[]) =>
  
  {
    let idcmd:Number;
    return knex.insert(commandeToInsert(commandeToBDD))
    .into('commande')
    .returning('id')
    .then((res) => {
        idcmd = res [0]
        ids.forEach((id)=>{
          knex.insert(PlatscommandeToInsert(PlatsCommandeToBDD(res[0], id)))
          .into('commande_plats')
          .returning('id')
          .then((result) => {
            if(result[0] != number){
              return BadRequest
            }

          })
        })
    }).then(() => {
  return {Identifiant : idcmd, 
    Statut : false, 
    message : "Votre commande est en préparation ! :)"}
    })
  
  };



export default insterCommande;