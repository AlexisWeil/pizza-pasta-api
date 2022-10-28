import { Plat, platToInsert } from 'Plats/models';
import knex from 'global/knex';
import { Exception } from 'global/api';

export type UpdatePlat = (plat: Plat) => Promise<Plat>;

const updatePlat: UpdatePlat = (plat: Plat) =>
  knex.update(platToInsert(plat))
    .from('plats')
    .where({ id: plat.id })
    .then((nbUpdated) => {
      if (nbUpdated <= 0)
        throw Exception('id', 'Plat inconnu');

      return plat;
    });

export default updatePlat;