import { Plat, platToInsert } from 'Plats/models';
import knex from 'global/knex';
import { CommandeJson, commandeToInsert } from 'Commande/models';

export type InsertCommande = (commandeJson: CommandeJson) => Promise<Object>;

const insterCommande: InsertCommande = (commandeJson: CommandeJson) =>
  
  {console.log(commandeJson)
    return knex.insert(commandeToInsert(commandeJson))
    .into('commande')
    .returning('id')
    .then((res) => {
      return {Identifiant : res[0], 
              Statut : false, 
              message : "Votre commande est en préparation ! :)"}
    })};

export default insterCommande;