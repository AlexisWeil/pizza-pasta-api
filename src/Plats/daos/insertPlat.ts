import { Plat, platToInsert } from 'Plats/models';
import knex, { handleSQLException } from 'global/knex';
import { Either, Left, Right } from 'monet';
import { Exception } from 'global/api';

export type InsertPlat = (plat: Plat) => Promise<Either<Exception, number>>;

const insertPlat: InsertPlat = (plat: Plat) =>
  knex.insert(platToInsert(plat))
    .into('plats')
    .returning('id')
    .then((id) => Right<Exception, number>(id[0]))
    .catch(handleSQLException('plat-insert'));

export default insertPlat;