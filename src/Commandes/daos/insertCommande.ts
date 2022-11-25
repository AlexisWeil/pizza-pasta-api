import { CommandeInsert } from 'Commandes/models';
import knex from 'global/knex';

export type InsertCommande = (commande: CommandeInsert) => Promise<number>;

const insertCommande: InsertCommande = (commande: CommandeInsert) =>
  knex.insert({
    'table_fk': commande.tableId
  }).into('commandes')
    .returning('id')
    .then((ids) =>
      knex.insert(
        commande.plats.map((platId) => ({
          'commande_fk': ids[0],
          'plat_fk': platId
        }))
      ).into('commandes_plats')
        .then(() => ids[0])
    );

export default insertCommande;