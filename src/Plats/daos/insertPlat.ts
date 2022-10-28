import { Plat, platToInsert } from 'Plats/models';
import knex from 'global/knex';

export type InsertPlat = (plat: Plat) => Promise<number>;

const insertPlat: InsertPlat = (plat: Plat) =>
  knex.insert(platToInsert(plat))
    .into('plats')
    .returning('id')
    .then((id) => id[0]);

export default insertPlat;