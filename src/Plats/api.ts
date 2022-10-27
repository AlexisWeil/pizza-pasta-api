import { BadRequest, Endpoint, Exception, NotFound, Ok } from 'global/api';
import { Request } from 'express';
import { Plat } from 'Plats/models';
import { PlatsService } from 'Plats/platsService';
import { z } from 'zod';
import { validate } from 'global/validations';
import { Categorie } from 'Categories/models';

export const getPlatByIdAPI = (platsService: PlatsService): Endpoint => (req: Request) => {
  const id = Number(req.params.id);

  if (isNaN(id))
    return Promise.resolve(BadRequest([Exception('id', 'ID is not a number')]));

  return platsService.getPlatById(id)
    .then((plat: Plat | undefined) =>
      plat ?
        Ok(plat) :
        NotFound('Plat inconnu')
    );
};

const PlatForm = z.object({
  nom: z.string()
});

type PlatForm = z.infer<typeof PlatForm>;

export const addPlat = (platsService: PlatsService): Endpoint => (req: Request) =>
  validate(PlatForm)(req.body)((platForm: PlatForm) =>
    Promise.resolve(Ok())
  );
