import knex from 'global/knex';
import { Exception } from 'global/api';

export type DeletePlat = (id: number) => Promise<void>;

const deletePlat: DeletePlat = (id: number) =>
  knex.delete()
    .from('plats')
    .where({id})
    .then((nbDeleted) => {
      if (nbDeleted <= 0)
        throw Exception('id', 'Plat inconnu');
    });

export default deletePlat;