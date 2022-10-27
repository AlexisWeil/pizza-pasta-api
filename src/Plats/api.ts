import { BadRequest, Endpoint, NotFound, Ok } from 'global/api';
import { Request } from 'express';
import { Plat } from 'Plats/models';
import { PlatsService } from 'Plats/platsService';

export const getPlatByIdAPI = (platsService: PlatsService): Endpoint => (req: Request) => {
  const id = Number(req.params.id);

  if (isNaN(id))
    return Promise.resolve(BadRequest({ error: 'ID is not a number' }));

  return platsService.getPlatById(id)
    .then((plat: Plat | undefined) =>
      plat ?
        Ok(plat) :
        NotFound('Plat inconnu')
    );
}
